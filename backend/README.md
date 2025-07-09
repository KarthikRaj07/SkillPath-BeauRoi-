# SkillPath Backend Server

## Quick Start

1. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Server:**
   ```bash
   python start_server.py
   ```

## Prerequisites

- Python 3.7+
- MySQL Server running on localhost:3306
- Database named "SkillPath" created
- Ollama running on localhost:11434 with Mistral model

## Database Setup

1. Create MySQL database:

   ```sql
   CREATE DATABASE SkillPath;
   ```

2. The required tables should be created automatically when the app starts.

## Configuration

Edit `app/config.py` to modify:

- Database credentials
- JWT secret key
- Ollama settings

## Troubleshooting

### Connection Reset Error

If you get `ERR_CONNECTION_RESET`:

1. Make sure the backend server is running
2. Check if port 5000 is available
3. Verify all dependencies are installed

### Database Connection Issues

1. Ensure MySQL is running
2. Check database credentials in `config.py`
3. Verify database "SkillPath" exists

### Ollama Issues

1. Make sure Ollama is installed and running
2. Verify Mistral model is downloaded: `ollama pull mistral:latest`
3. Check if Ollama is accessible at http://localhost:11434

## API Endpoints

- `POST /register` - User registration
- `POST /login` - User login
- `POST /submit` - Submit user data
- `POST /api/chat` - Chat with AI
- `GET /test-ollama` - Test Ollama connection

## Development

Run with debug mode:

```bash
python main.py
```

The server will be available at http://localhost:5000
