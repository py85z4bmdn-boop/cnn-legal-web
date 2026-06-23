# CNN Legal Support - Rust Backend

Rust backend server for CNN Legal Support chat functionality using Axum framework and OpenRouter API integration with DeepSeek V3 model.

## Features

- **Axum Web Framework**: Fast and ergonomic web framework
- **OpenRouter API Integration**: Uses DeepSeek V3 model (`deepseek/deepseek-chat`)
- **Rate Limiting**: 10 requests per minute per IP address
- **CORS Support**: Configurable allowed origins
- **Secure API Key Handling**: API keys loaded from environment variables only
- **Error Handling**: Generic error messages without exposing sensitive information

## Prerequisites

- Rust 1.70 or higher
- OpenRouter API key

## Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables in `.env`:**
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   PORT=3001
   ALLOWED_ORIGIN=http://localhost:4322
   ```

3. **Install dependencies:**
   ```bash
   cargo build
   ```

## Running the Server

### Development Mode
```bash
cargo run
```

### Production Build
```bash
cargo build --release
./target/release/cnn-legal-support
```

The server will start on `http://0.0.0.0:3001` (or the port specified in `.env`).

## API Endpoints

### POST /chat

Send a chat message and receive a response from the AI assistant.

**Request:**
```json
{
  "message": "Your legal question here"
}
```

**Response (Success):**
```json
{
  "reply": "AI assistant response"
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

**Validation:**
- Message cannot be empty
- Message maximum length: 2000 characters

**Rate Limiting:**
- 10 requests per minute per IP address
- Returns 429 status code when limit exceeded

## Testing

Test the endpoint using curl:

```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is contract law?"}'
```

## Security

- API keys are NEVER logged or exposed in responses
- All errors return generic messages to prevent information leakage
- API key is only read from environment variables
- CORS is configured to allow only specified origins

## Configuration

### Chat Configuration

Default configuration in `src/config/mod.rs`:
- **Model**: `deepseek/deepseek-chat`
- **Max Tokens**: 2000
- **Temperature**: 0.7
- **System Prompt**: Configurable legal assistant prompt

### Rate Limiting

Configured in `src/middleware/rate_limit.rs`:
- **Max Requests**: 10 per minute
- **Window**: 60 seconds

## Project Structure

```
rust-backend/
├── src/
│   ├── config/          # Configuration management
│   ├── handlers/        # HTTP request handlers
│   ├── middleware/      # Rate limiting and other middleware
│   ├── services/        # OpenRouter API client
│   └── main.rs          # Server setup and routing
├── Cargo.toml           # Dependencies
├── .env.example         # Environment variables template
└── README.md            # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API key (required) | - |
| `PORT` | Server port | 3001 |
| `ALLOWED_ORIGIN` | CORS allowed origin | http://localhost:4322 |

## Troubleshooting

### Server won't start
- Ensure `.env` file exists with valid `OPENROUTER_API_KEY`
- Check if port 3001 is already in use
- Verify Rust toolchain is installed: `rustc --version`

### API requests fail
- Verify OpenRouter API key is valid
- Check network connectivity
- Review server logs for error messages

### Rate limit errors
- Wait 60 seconds before retrying
- Reduce request frequency
- Consider implementing request queuing on frontend

## License

Proprietary - CNN Legal Support