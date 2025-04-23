import mysql.connector
from mysql.connector import Error

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',          # or your DB server
            user='root',    # replace with your MySQL username
            password='1212',# replace with your MySQL password
            database='SRS',   # replace with your DB name
            auth_plugin='mysql_native_password'
        )
        if connection.is_connected():
            print("✅ Connected to MySQL database")
            return connection
    except Error as e:
        print(f"❌ Error while connecting to MySQL: {e}")
        return None
