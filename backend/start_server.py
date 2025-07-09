#!/usr/bin/env python3
"""
Startup script for SkillPath backend server
"""

import sys
import subprocess
import importlib

def check_dependencies():
    """Check if all required packages are installed"""
    required_packages = [
        'flask',
        'flask_cors', 
        'flask_jwt_extended',
        'mysql.connector',
        'bcrypt',
        'requests'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package} is installed")
        except ImportError:
            missing_packages.append(package)
            print(f"❌ {package} is missing")
    
    if missing_packages:
        print(f"\nMissing packages: {', '.join(missing_packages)}")
        print("Please install them using: pip install -r requirements.txt")
        return False
    
    return True

def check_database():
    """Test database connection"""
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

def main():
    """Main startup function"""
    print("🚀 Starting SkillPath Backend Server...")
    print("=" * 50)
    
    # Check dependencies
    print("\n1. Checking dependencies...")
    if not check_dependencies():
        sys.exit(1)
    
    # Check database
    print("\n2. Checking database connection...")
    if not check_database():
        print("⚠️  Database connection failed, but continuing...")
        print("   Make sure MySQL is running and credentials are correct in config.py")
    
    # Start the server
    print("\n3. Starting Flask server...")
    try:
        from app import app
        print("✅ Flask app imported successfully")
        print("🌐 Server will be available at: http://localhost:5000")
        print("📝 Press Ctrl+C to stop the server")
        print("=" * 50)
        
        app.run(debug=True, port=5000, host='0.0.0.0')
        
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 