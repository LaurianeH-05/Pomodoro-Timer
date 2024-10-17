#run.py
from app import create_app
from app.models import db
from app.config import get_config
from flask_migrate import Migrate


# Create the Flask app using the factory function
app = create_app()

migrate = Migrate(app, db)

# Load the configuration
app.config.from_object(get_config())

# Create the database tables within the application context
with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
