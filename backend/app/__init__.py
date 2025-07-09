from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config import Config
from app.routes import init_routes

def create_app(config_name='default'):
    """Application factory pattern to create Flask app"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}}, 
         supports_credentials=Config.CORS_SUPPORTS_CREDENTIALS)
    jwt = JWTManager(app)
    
    # Initialize routes
    init_routes(app, jwt)
    
    return app

# Create the app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=Config.DEBUG, port=Config.PORT)

