import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'portfolio';
const COLLECTION_NAME = 'messages';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://devportfolio-livid-three.vercel.app'],
  credentials: true
}));
app.use(express.json());

// MongoDB client
let db;
const client = new MongoClient(MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// Submit message endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Store in MongoDB
    const result = await db.collection(COLLECTION_NAME).insertOne({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date(),
      status: 'new'
    });

    console.log(`✓ Message saved: ${result.insertedId}`);

    res.status(201).json({
      success: true,
      messageId: result.insertedId,
      message: `Thanks, ${name}! I'll get back to you soon.`
    });

  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get all messages (admin only - add authentication later)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.collection(COLLECTION_NAME)
      .find()
      .sort({ submittedAt: -1 })
      .toArray();

    res.json({ count: messages.length, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'portfolio-backend' });
});

// Start server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...');
  await client.close();
  process.exit(0);
});
