
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)  
    Migrate(app, db)
    CORS(app)

    with app.app_context():
        from .routes.todo_routes import todo_bp
        app.register_blueprint(todo_bp)

        return app
