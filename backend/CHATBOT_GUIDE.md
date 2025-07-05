# SkillPath AI Assistant - Conversational Chatbot Guide

## 🤖 Overview

The SkillPath AI Assistant is now a conversational chatbot powered by **Mistral** (via Ollama) that provides career development guidance, skill recommendations, and professional advice in a friendly, interactive manner.

## ✨ Features

- **Conversational Interface**: Natural, friendly chat experience
- **Career Development Focus**: Specialized in career advice and guidance
- **Quick Reply Buttons**: Pre-defined conversation starters
- **Professional Guidance**: Resume tips, interview prep, networking advice
- **Skill Development**: Technology and soft skill recommendations
- **Fallback Mode**: Works even without Ollama running

## 🚀 Quick Setup

### Option 1: Automatic Setup (Recommended)

```bash
# Install dependencies and setup Ollama with Mistral
python setup_ollama.py

# Start the application
python main.py
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Install Ollama (if not already installed)
# Download from: https://ollama.ai

# 3. Start Ollama
ollama serve

# 4. Pull Mistral model
ollama pull mistral:latest

# 5. Start the application
python main.py
```

## 💬 How to Use the Chatbot

### Starting a Conversation

1. Navigate to the chat interface in your frontend
2. You'll see a welcome message with quick reply buttons
3. Click any quick reply or type your own message

### Quick Reply Options

- "How can I transition to a new career?"
- "What skills should I learn for tech jobs?"
- "Help me prepare for interviews"
- "How do I build my professional network?"
- "What's the best way to update my resume?"

### Example Conversations

**User**: "I want to transition from marketing to data science"
**AI**: "That's an exciting career move! Data science is a great field with lots of opportunities. Let me help you plan this transition. What's your current technical background? Do you have any experience with programming or statistics?"

**User**: "I'm preparing for a software engineering interview"
**AI**: "Great! Software engineering interviews can be challenging but manageable with the right preparation. Let's break this down: Are you preparing for technical interviews, behavioral interviews, or both? Also, what type of company are you interviewing with - startup, big tech, or something else?"

## 🔧 Configuration

### Backend Configuration (`app/config.py`)

```python
# Ollama configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "mistral:latest"  # Conversational model
OLLAMA_TIMEOUT = 60
```

### System Prompt

The chatbot uses a specialized system prompt to ensure career-focused, conversational responses:

```
You are SkillPath AI, a friendly and knowledgeable career development assistant. You help people with:

- Career advice and guidance
- Skill development recommendations
- Job transition strategies
- Interview preparation tips
- Professional development planning
- Resume and LinkedIn optimization
- Networking strategies
- Industry insights and trends

Be conversational, supportive, and provide practical, actionable advice. Use a warm, encouraging tone and ask follow-up questions when appropriate to better understand the user's needs.
```

## 🎨 Frontend Features

### Enhanced UI Elements

- **Welcome Screen**: Engaging introduction with quick reply buttons
- **Typing Indicators**: Animated dots when AI is thinking
- **Message Bubbles**: Clean, modern chat interface
- **Responsive Design**: Works on desktop and mobile

### Quick Reply Buttons

- Pre-defined conversation starters
- One-click access to common questions
- Helps users get started quickly

## 🐛 Troubleshooting

### Ollama Not Running

```
Error: Cannot connect to Ollama. Make sure Ollama is running on localhost:11434
```

**Solution**:

1. Install Ollama from https://ollama.ai
2. Run `ollama serve`
3. Pull the model: `ollama pull mistral:latest`

### Model Not Found

```
Error: Model 'mistral:latest' not found
```

**Solution**: Run `ollama pull mistral:latest`

### Slow Responses

- Mistral is a large model and may take time to respond
- Consider using a smaller model like `mistral:7b` for faster responses
- Update the model in `app/config.py`

### Fallback Mode

If Ollama is not available, the chatbot will provide a friendly fallback response and continue to work for basic functionality.

## 🔄 Customization

### Changing the Model

Edit `app/config.py`:

```python
OLLAMA_MODEL = "your-preferred-model:latest"
```

### Modifying System Prompt

Edit the system prompt in `app/services.py` to change the chatbot's personality and expertise areas.

### Adding Quick Replies

Edit `QUICK_REPLIES` array in `OllamaDeepseekChat.jsx`:

```javascript
const QUICK_REPLIES = [
  "Your new quick reply",
  "Another suggestion",
  // ... existing replies
];
```

## 📱 Testing the Chatbot

1. **Start the backend**: `python main.py`
2. **Open your frontend** and navigate to the chat
3. **Test with quick replies** or type custom messages
4. **Verify responses** are conversational and career-focused

## 🎯 Best Practices

- **Keep conversations flowing**: The AI is designed to ask follow-up questions
- **Be specific**: Provide context about your situation for better advice
- **Use quick replies**: They're designed to start meaningful conversations
- **Test fallback mode**: Try disconnecting Ollama to see the fallback response

## 🚀 Next Steps

- Consider adding conversation history persistence
- Implement user preferences and personalized advice
- Add file upload for resume/LinkedIn profile review
- Integrate with job boards for real-time opportunities
