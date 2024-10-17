# __init__.py
from flask import Flask
from flask_login import LoginManager
from .models import db  # Import db from models
from .routes import api  # Import the API routes
from .config import get_config  # Import the config function
from flask_cors import CORS

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())  # Load configuration from the config function

    # Initialize the database with the app
    db.init_app(app)
    login_manager.init_app(app)

    CORS(app, origins=["http://localhost:3000"])
    # Register the API blueprint
    app.register_blueprint(api, url_prefix='/api')

    return app
@login_manager.user_loader
def load_user(user_id):
    from .models import User  # Import here to avoid circular import
    return User.query.get(int(user_id))