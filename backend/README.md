# Portfolio Backend

Node.js Express server handling contact form submissions to MongoDB.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Copy `.env.example` to `.env` and add your connection string

### 3. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

**Response (201):**
```json
{
  "success": true,
  "messageId": "507f1f77bcf86cd799439011",
  "message": "Thanks, John Doe! I'll get back to you soon."
}
```

### GET `/api/messages`
Retrieve all messages (currently public - add auth if needed).

**Response:**
```json
{
  "count": 5,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!",
      "submittedAt": "2025-04-12T14:30:00.000Z",
      "status": "new"
    }
  ]
}
```

### GET `/api/health`
Health check endpoint.

## Deployment

Deploy to production:
- **Railway**: `npm install && npm start`
- **Render**: `npm start`
- **Vercel (Serverless)**: Requires modification
- **Heroku**: `npm start`

Set `MONGODB_URI` as environment variable on your host.
