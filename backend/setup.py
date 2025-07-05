#!/usr/bin/env python3
"""
Setup script for SkillPath Backend
This script helps install dependencies and run the application
"""

import subprocess
import sys
import os

def install_dependencies():
    """Install required dependencies"""
    print("Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def check_ollama():
    """Check if Ollama is running"""
    print("Checking Ollama connection...")
    try:
        import requests
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        if response.status_code == 200:
            print("✅ Ollama is running!")
            return True
        else:
            print("❌ Ollama is not responding properly")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Ollama. Make sure Ollama is running on localhost:11434")
        print("   You can start Ollama by running: ollama serve")
        print("   To use Mistral model: ollama pull mistral:latest")
        return False
    except ImportError:
        print("❌ Requests module not available. Installing dependencies first...")
        return False

def run_app():
    """Run the Flask application"""
    print("Starting Flask application...")
    try:
        subprocess.run([sys.executable, "main.py"])
    except KeyboardInterrupt:
        print("\n🛑 Application stopped by user")
    except Exception as e:
        print(f"❌ Failed to start application: {e}")

def main():
    print("🚀 SkillPath Backend Setup")
    print("=" * 40)
    
    # Check if requirements.txt exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        return
    
    # Install dependencies
    if not install_dependencies():
        return
    
    # Check Ollama
    ollama_running = check_ollama()
    if not ollama_running:
        print("\n⚠️  Warning: Ollama is not running. Chat functionality will not work.")
        print("   To start Ollama, run: ollama serve")
        print("   You can still test other endpoints without Ollama.\n")
    
    # Run the application
    run_app()

if __name__ == "__main__":
    main() 