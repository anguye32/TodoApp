from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS
from config import Config
from extensions import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app)

    db.init_app(app)

    with app.app_context():
        from .routes.todo_routes import todo_bp
        app.register_blueprint(todo_bp)

        return app
