#!/usr/bin/env python3
"""
Test script to verify chat log storage functionality
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_database_connection():
    """Test database connection"""
    print("🔍 Testing database connection...")
    try:
        from app.utils import create_connection
        conn = create_connection()
        if conn:
            print("✅ Database connection successful")
            conn.close()
            return True
        else:
            print("❌ Database connection failed")
            return False
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return False

def test_chat_log_creation():
    """Test chat log creation"""
    print("\n🔍 Testing chat log creation...")
    try:
        from app.models import ChatLog
        
        # Test data
        test_user_id = 1
        test_question = "What skills should I learn for data science?"
        test_answer = "For data science, you should focus on Python, statistics, machine learning, and data visualization."
        
        # Create chat log
        chat_id, error = ChatLog.create(test_user_id, test_question, test_answer)
        
        if error:
            print(f"❌ Chat log creation failed: {error}")
            return False
        else:
            print(f"✅ Chat log created successfully with ID: {chat_id}")
            return True
            
    except Exception as e:
        print(f"❌ Chat log creation error: {e}")
        return False

def test_chat_log_retrieval():
    """Test chat log retrieval"""
    print("\n🔍 Testing chat log retrieval...")
    try:
        from app.models import ChatLog
        
        # Retrieve chat logs for user 1
        chat_logs, error = ChatLog.get_by_user_id(1, limit=10)
        
        if error:
            print(f"❌ Chat log retrieval failed: {error}")
            return False
        else:
            print(f"✅ Retrieved {len(chat_logs)} chat logs")
            for i, log in enumerate(chat_logs[:3]):  # Show first 3
                print(f"  {i+1}. User ID: {log['user_id']}, Question: {log['question'][:50]}...")
            return True
            
    except Exception as e:
        print(f"❌ Chat log retrieval error: {e}")
        return False

def test_chat_service():
    """Test the complete chat service"""
    print("\n🔍 Testing chat service...")
    try:
        from app.services import ChatService
        
        # Test chat processing
        test_user_id = 1
        test_prompt = "How can I improve my programming skills?"
        
        response, error = ChatService.process_chat(test_user_id, test_prompt)
        
        if error:
            print(f"❌ Chat service failed: {error}")
            return False
        else:
            print(f"✅ Chat service successful")
            print(f"   Response: {response[:100]}...")
            return True
            
    except Exception as e:
        print(f"❌ Chat service error: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Testing Chat Log Storage Functionality")
    print("=" * 50)
    
    # Test database connection
    if not test_database_connection():
        print("\n❌ Database connection failed. Please check your MySQL setup.")
        return
    
    # Test chat log creation
    if not test_chat_log_creation():
        print("\n❌ Chat log creation failed.")
        return
    
    # Test chat log retrieval
    if not test_chat_log_retrieval():
        print("\n❌ Chat log retrieval failed.")
        return
    
    # Test chat service
    if not test_chat_service():
        print("\n❌ Chat service failed.")
        return
    
    print("\n🎉 All tests passed! Chat log storage is working correctly.")

if __name__ == "__main__":
    main() 