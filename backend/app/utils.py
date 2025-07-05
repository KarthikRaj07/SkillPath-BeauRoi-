import mysql.connector
from mysql.connector import Error
import bcrypt
from app.config import Config

def create_connection():
    """Create and return a database connection"""
    try:
        connection = mysql.connector.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME,
            auth_plugin=Config.DB_AUTH_PLUGIN
        )
        if connection.is_connected():
            print("✅ Connected to MySQL database")
            return connection
    except Error as e:
        print(f"❌ Error while connecting to MySQL: {e}")
        return None

def hash_password(password):
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password, hashed_password):
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def skills_to_string(skills_list):
    """Convert skills list to comma-separated string"""
    return ",".join(skills_list) if isinstance(skills_list, list) else skills_list

def string_to_skills(skills_string):
    """Convert comma-separated string to skills list"""
    return skills_string.split(",") if skills_string else []
