import mysql.connector
from mysql.connector import Error

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',          
            user='root',    
            password='1212',
            database='SkillPath',   
            auth_plugin='mysql_native_password'
        )
        if connection.is_connected():
            print("✅ Connected to MySQL database")
            return connection
    except Error as e:
        print(f"❌ Error while connecting to MySQL: {e}")
        return None
