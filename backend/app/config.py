import os

class Config:
    """Base configuration class"""
    JWT_SECRET_KEY = 'your-secret-key'  # Change this in production
    DEBUG = True
    PORT = 5000
    
    # Database configuration
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASSWORD = '1212'
    DB_NAME = 'SkillPath'
    DB_AUTH_PLUGIN = 'mysql_native_password'
    
    # Ollama configuration
    OLLAMA_URL = "http://localhost:11434/api/generate"
    OLLAMA_MODEL = "mistral:latest"  # Changed to Mistral for conversational chat
    OLLAMA_TIMEOUT = 80
    
    # CORS configuration
    CORS_ORIGINS = "*"
    CORS_SUPPORTS_CREDENTIALS = False

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
