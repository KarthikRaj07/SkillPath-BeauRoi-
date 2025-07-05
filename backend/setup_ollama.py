#!/usr/bin/env python3
"""
Ollama Setup Script for SkillPath Backend
This script helps set up Ollama with Mistral model for conversational chat
"""

import subprocess
import sys
import requests
import time

def check_ollama_installed():
    """Check if Ollama is installed"""
    try:
        result = subprocess.run(['ollama', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Ollama is installed: {result.stdout.strip()}")
            return True
        else:
            print("❌ Ollama is not properly installed")
            return False
    except FileNotFoundError:
        print("❌ Ollama is not installed")
        print("   Please install Ollama from: https://ollama.ai")
        return False

def start_ollama():
    """Start Ollama service"""
    print("Starting Ollama service...")
    try:
        # Start Ollama in background
        subprocess.Popen(['ollama', 'serve'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✅ Ollama service started")
        return True
    except Exception as e:
        print(f"❌ Failed to start Ollama: {e}")
        return False

def wait_for_ollama():
    """Wait for Ollama to be ready"""
    print("Waiting for Ollama to be ready...")
    for i in range(30):  # Wait up to 30 seconds
        try:
            response = requests.get("http://localhost:11434/api/tags", timeout=2)
            if response.status_code == 200:
                print("✅ Ollama is ready!")
                return True
        except:
            pass
        time.sleep(1)
        if i % 5 == 0:
            print(f"   Still waiting... ({i+1}/30 seconds)")
    
    print("❌ Ollama did not start within 30 seconds")
    return False

def pull_mistral_model():
    """Pull the Mistral model"""
    print("Pulling Mistral model (this may take a few minutes)...")
    try:
        result = subprocess.run(['ollama', 'pull', 'mistral:latest'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Mistral model downloaded successfully!")
            return True
        else:
            print(f"❌ Failed to pull Mistral model: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error pulling Mistral model: {e}")
        return False

def test_mistral():
    """Test Mistral model"""
    print("Testing Mistral model...")
    try:
        payload = {
            "model": "mistral:latest",
            "prompt": "Hello! Can you introduce yourself in one sentence?",
            "stream": False
        }
        response = requests.post("http://localhost:11434/api/generate", 
                               json=payload, timeout=30)
        if response.status_code == 200:
            data = response.json()
            print("✅ Mistral is working!")
            print(f"   Response: {data.get('response', 'No response')[:100]}...")
            return True
        else:
            print(f"❌ Mistral test failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing Mistral: {e}")
        return False

def main():
    print("🤖 Ollama Setup for SkillPath AI Assistant")
    print("=" * 50)
    
    # Check if Ollama is installed
    if not check_ollama_installed():
        return
    
    # Start Ollama
    if not start_ollama():
        return
    
    # Wait for Ollama to be ready
    if not wait_for_ollama():
        return
    
    # Pull Mistral model
    if not pull_mistral_model():
        return
    
    # Test Mistral
    if not test_mistral():
        return
    
    print("\n🎉 Setup complete! Your SkillPath AI Assistant is ready.")
    print("   You can now run: python main.py")
    print("   The chatbot will use Mistral for conversational responses.")

if __name__ == "__main__":
    main() 