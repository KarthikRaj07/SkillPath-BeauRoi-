import requests
from app.models import User, UserInput, Roadmap, ChatLog
from app.config import Config

class AuthService:
    """Authentication service"""
    
    @staticmethod
    def register_user(username, email, password):
        """Register a new user"""
        if not username or not email or not password:
            return None, "Username, email and password are required"
        
        user_id, error = User.create(username, email, password)
        if error:
            return None, error
        
        return user_id, None
    
    @staticmethod
    def login_user(email, password):
        """Authenticate and login user"""
        if not email or not password:
            return None, "Email and password required"
        
        user, error = User.authenticate(email, password)
        if error:
            return None, error
        
        return user, None

class UserInputService:
    """User input service"""
    
    @staticmethod
    def submit_user_data(user_id, name, current_job, skills, required_job):
        """Submit user input data"""
        if not name or not current_job or not skills or not required_job:
            return None, "Invalid input data"
        
        input_id, error = UserInput.create(user_id, name, current_job, required_job, skills)
        if error:
            return None, error
        
        return {
            "input_id": input_id,
            "name": name,
            "current_job": current_job,
            "skills": skills,
            "required_job": required_job
        }, None

class RoadmapService:
    """Roadmap service"""
    
    @staticmethod
    def save_roadmap(user_id, input_id, roadmap):
        """Save a roadmap"""
        if not input_id or not roadmap:
            return None, "Missing input_id or roadmap"
        
        roadmap_id, error = Roadmap.create(user_id, input_id, roadmap)
        if error:
            return None, error
        
        return roadmap_id, None

class OllamaService:
    """Ollama integration service"""
    
    @staticmethod
    def run_ollama(prompt):
        """Run Ollama with the given prompt"""
        try:
            # Check if this is a simple greeting (not a question about careers)
            simple_greetings = ['hello', 'hi', 'hey']
            is_simple_greeting = any(greeting == prompt.lower().strip() for greeting in simple_greetings)
            
            print(f"Prompt: '{prompt}'")
            print(f"Is simple greeting: {is_simple_greeting}")
            
            if is_simple_greeting:
                return """Hello! I'm SkillPath AI, your career development assistant. I'm here to help you with your professional goals and career journey.

I can assist you with:
- Career transitions and advice
- Skill development recommendations
- Interview preparation strategies
- Resume and LinkedIn optimization
- Networking and professional growth
- Industry insights and trends

What would you like to work on today? Feel free to ask me anything about your career development!""", None
            # Create a conversational system prompt for career development
            system_prompt = """You are SkillPath AI, a friendly and knowledgeable career development assistant. You help people with:

- Career advice and guidance
- Skill development recommendations  
- Job transition strategies
- Interview preparation tips
- Professional development planning
- Resume and LinkedIn optimization
- Networking strategies
- Industry insights and trends

Be conversational, supportive, and provide practical, actionable advice. Use a warm, encouraging tone and ask follow-up questions when appropriate to better understand the user's needs.

CRITICAL INSTRUCTIONS:
- You are SkillPath AI, a career development assistant
- NEVER mention cats, pets, or unrelated topics
- ALWAYS focus on career and professional development
- If the user asks about anything unrelated to careers, gently redirect them to career topics
- Provide specific, actionable career advice
- Give detailed, personalized responses based on the user's specific question
- Avoid generic or template responses"""
            
            # Create a more structured prompt to prevent generic responses
            full_prompt = f"""<|system|>
{system_prompt}
<|user|>
{prompt}
<|assistant|>"""
            
            payload = {
                "model": Config.OLLAMA_MODEL,
                "prompt": full_prompt,
                "stream": False
            }
            print(f"Sending request to Ollama: {Config.OLLAMA_URL}")
            print(f"Payload: {payload}")
            response = requests.post(Config.OLLAMA_URL, json=payload, timeout=Config.OLLAMA_TIMEOUT)
            print(f"Ollama response status: {response.status_code}")
            print(f"Ollama response headers: {response.headers}")
            response.raise_for_status()
            data = response.json()
            print(f"Ollama response data: {data}")
            response_text = data.get("response", "No response from Mistral")
            print(f"Extracted response: {response_text[:100]}...")
            return response_text, None
        except requests.exceptions.ConnectionError:
            # Fallback response when Ollama is not available
            print("Ollama not available, using fallback response")
            fallback_response = """Hello! I'm SkillPath AI, your career development assistant. I'm here to help you with your career goals and provide guidance on skill development, job transitions, and professional growth.

I can help you with:
- Career advice and guidance
- Skill development recommendations
- Job transition strategies
- Interview preparation tips
- Professional development planning

What would you like to discuss today? Feel free to ask me anything about your career journey!"""
            return fallback_response, None
        except Exception as e:
            error_msg = f"Error running Ollama: {str(e)}"
            print(f"Exception type: {type(e)}")
            print(f"Exception details: {error_msg}")
            return None, error_msg
    
    @staticmethod
    def test_ollama():
        """Test if Ollama is running"""
        response, error = OllamaService.run_ollama("What career advice can you give me?")
        if error:
            return None, error
        return response, None

class ChatService:
    """Chat service"""
    
    @staticmethod
    def process_chat(user_id, prompt):
        """Process a chat message"""
        if not prompt:
            return None, "No prompt provided"
        
        print(f"Processing chat for user_id: {user_id}, prompt: {prompt[:50]}...")
        
        # Get response from Ollama
        response, error = OllamaService.run_ollama(prompt)
        if error:
            print(f"Error getting Ollama response: {error}")
            return None, error
        
        print(f"Got response from Ollama: {response[:100]}...")
        
        # Save chat log
        print(f"Attempting to save chat log for user_id: {user_id}")
        chat_id, save_error = ChatLog.create(user_id, prompt, response)
        if save_error:
            print(f"❌ Failed to save chat log: {save_error}")
            print(f"User ID: {user_id}, Prompt length: {len(prompt)}, Response length: {len(response)}")
        else:
            print(f"✅ Chat log saved successfully with ID: {chat_id}")
        
        return response, None
