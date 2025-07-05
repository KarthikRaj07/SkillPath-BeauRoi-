import mysql.connector
from mysql.connector import Error
from app.config import Config

def create_connection():
    """Create and return a database connection using configuration"""
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
