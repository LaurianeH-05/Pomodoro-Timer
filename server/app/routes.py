# routes.py
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from .models import db, PomodoroSession, User
from flask_login import login_user

# Create a Flask Blueprint for the routes
api = Blueprint('api', __name__)

# Route for logging user session data
@api.route('/session', methods=['POST'])
def log_session():
    data = request.get_json()

    user_id = data.get('user_id')  # Ensure you're passing the user_id in your request
    total_time_worked = data.get('total_time_worked')
    pomodoro_count = data.get('pomodoro_count')

    # Validate input data
    if user_id is None or total_time_worked is None or pomodoro_count is None:
        return jsonify({'error': 'User ID, total time worked, and Pomodoro count are required.'}), 400

    # Create a new Pomodoro session
    new_session = PomodoroSession(
        user_id=user_id,
        total_time_worked=total_time_worked,
        pomodoro_count=pomodoro_count
    )

    # Store the session in the database
    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Session logged successfully!"}), 201

# Route for retrieving user preferences (for demonstration)
@api.route('/preferences', methods=['GET'])
def get_preferences():
    return jsonify({
        'message': 'User preferences retrieved successfully!'
    })

# Route for retrieving user stats
@api.route('/stats', methods=['GET'])
def get_stats():
    user_id = request.args.get('user_id')  # Assuming you pass user_id as a query parameter
    week_start = datetime.now() - timedelta(days=datetime.now().weekday())  # Start of the week

    sessions = PomodoroSession.query.filter(
        PomodoroSession.user_id == user_id,
        PomodoroSession.created_at >= week_start
    ).all()

    total_pomodoros = sum(session.pomodoro_count for session in sessions)

    return jsonify({
        "total_pomodoros": total_pomodoros,
        "sessions": [session.to_dict() for session in sessions]
    }), 200

# Route for user login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')  # Get username from request
    password = data.get('password')  # Get password from request

    # Query the user by username
    user = User.query.filter_by(username=username).first()  
    if user and user.check_password(password):  # Check if user exists and password matches
        login_user(user)  # Log the user in
        return jsonify({
            'message': 'Login successful',
            'user': {'username': user.username}  # Return username instead of email
        }), 200
    
    return jsonify({'error': 'Invalid username or password'}), 401

# Route for user signup
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate username and password
    if not username or len(username) < 3:
        return jsonify({'error': 'Username is required and must be at least 3 characters long.'}), 400

    if not password or len(password) < 8:
        return jsonify({'error': 'Password is required and must be at least 8 characters long.'}), 400

    if User.query.filter_by(email=email).first():  # Check if the email already exists
        return jsonify({'error': 'Email already exists'}), 400

    # Check if the username already exists
    if User.query.filter_by(username=username).first():  # Check if the username already exists
        return jsonify({'error': 'Username already exists'}), 400

    # Create a new user
    new_user = User(username=username, email=email)  # Include email if you want to store it
    new_user.set_password(password)  # Hash the password

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User signed up successfully!'}), 201
