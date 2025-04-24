# test_connection.py
import mysql.connector
from mysql.connector import Error

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='1212',
        database='SRS',
        auth_plugin='mysql_native_password'
    )
    if conn.is_connected():
        print("✅ Successfully connected to MySQL!")
except Error as e:
    print(f"❌ Connection failed: {e}")
