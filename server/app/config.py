# configuration settings(e,g. database URI)
#config.py
import os

class Config:
    # General configuration settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')  # Keep this secret in production
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable track modifications for performance

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL', 'sqlite:///dev.db')  # Development database URI
    DEBUG = True  # Enable debug mode for development

class TestingConfig(Config):
    TESTING = True  # Enable testing mode
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite:///:memory:')  # In-memory SQLite database for tests

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///prod.db')  # Production database URI
    DEBUG = False  # Disable debug mode in production

# Function to get the appropriate configuration class based on the environment variable
def get_config():
    config_name = os.getenv('FLASK_CONFIG', 'DevelopmentConfig')  # Default to DevelopmentConfig
    if config_name == 'TestingConfig':
        return TestingConfig
    elif config_name == 'ProductionConfig':
        return ProductionConfig
    else:
        return DevelopmentConfig  # Default to DevelopmentConfig