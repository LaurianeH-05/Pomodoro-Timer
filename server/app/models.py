#models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Initialize the SQLAlchemy object
db = SQLAlchemy()

class PomodoroSession(db.Model):
    __tablename__ = 'pomodoro_sessions'  # Define table name
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    total_time_worked = db.Column(db.Integer, nullable=False)  # Store session duration in minutes
    pomodoro_count = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_time_worked': self.total_time_worked,
            'pomodoro_count': self.pomodoro_count,
            'created_at': self.created_at.isoformat()
        }

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(150), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def is_active(self):
        # Return True if the user is active, False otherwise
        return True  # or implement your own logic here