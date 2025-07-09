#!/usr/bin/env python3
"""
Script to check database table structure
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def check_database_tables():
    """Check if all required tables exist"""
    print("🔍 Checking database tables...")
    try:
        from app.utils import create_connection
        
        conn = create_connection()
        if not conn:
            print("❌ Database connection failed")
            return False
        
        cursor = conn.cursor()
        
        # Check if tables exist
        tables_to_check = ['users', 'user_inputs', 'roadmaps', 'chat_logs']
        
        for table in tables_to_check:
            try:
                cursor.execute(f"DESCRIBE {table}")
                columns = cursor.fetchall()
                print(f"✅ Table '{table}' exists with {len(columns)} columns")
                
                # Show column structure for chat_logs
                if table == 'chat_logs':
                    print(f"   Columns in {table}:")
                    for col in columns:
                        print(f"     - {col[0]} ({col[1]})")
                        
            except Exception as e:
                print(f"❌ Table '{table}' does not exist or error: {e}")
                return False
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error checking tables: {e}")
        return False

def check_chat_logs_data():
    """Check if there's any data in chat_logs table"""
    print("\n🔍 Checking chat_logs data...")
    try:
        from app.utils import create_connection
        
        conn = create_connection()
        if not conn:
            print("❌ Database connection failed")
            return False
        
        cursor = conn.cursor(dictionary=True)
        
        # Count total chat logs
        cursor.execute("SELECT COUNT(*) as count FROM chat_logs")
        result = cursor.fetchone()
        total_count = result['count']
        print(f"📊 Total chat logs in database: {total_count}")
        
        if total_count > 0:
            # Show recent chat logs
            cursor.execute("SELECT * FROM chat_logs ORDER BY timestamp DESC LIMIT 5")
            recent_logs = cursor.fetchall()
            print(f"📝 Recent chat logs:")
            for i, log in enumerate(recent_logs, 1):
                print(f"  {i}. User ID: {log['user_id']}, Question: {log['question'][:50]}...")
        else:
            print("📝 No chat logs found in database")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error checking chat logs data: {e}")
        return False

def create_chat_logs_table_if_missing():
    """Create chat_logs table if it doesn't exist"""
    print("\n🔍 Checking if chat_logs table needs to be created...")
    try:
        from app.utils import create_connection
        
        conn = create_connection()
        if not conn:
            print("❌ Database connection failed")
            return False
        
        cursor = conn.cursor()
        
        # Check if table exists
        cursor.execute("SHOW TABLES LIKE 'chat_logs'")
        table_exists = cursor.fetchone()
        
        if not table_exists:
            print("📝 Creating chat_logs table...")
            create_table_sql = """
            CREATE TABLE chat_logs (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                question TEXT,
                answer TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """
            cursor.execute(create_table_sql)
            conn.commit()
            print("✅ chat_logs table created successfully")
        else:
            print("✅ chat_logs table already exists")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error creating chat_logs table: {e}")
        return False

def main():
    """Main function"""
    print("🔧 Database Structure Check")
    print("=" * 50)
    
    # Create chat_logs table if missing
    if not create_chat_logs_table_if_missing():
        print("❌ Failed to create chat_logs table")
        return
    
    # Check all tables
    if not check_database_tables():
        print("❌ Database table check failed")
        return
    
    # Check chat logs data
    if not check_chat_logs_data():
        print("❌ Chat logs data check failed")
        return
    
    print("\n🎉 Database structure check completed successfully!")

if __name__ == "__main__":
    main() 