require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Lead = require('./models/Lead');
const Deal = require('./models/Deal');
const Task = require('./models/Task');
const Contact = require('./models/Contact');
const Meeting = require('./models/Meeting');
const SupportTicket = require('./models/SupportTicket');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'crm-secret-key-123';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crm';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));


// Middleware: Verify JWT & Role
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
  next();
};

// --- APIs ---

// Auth API
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: new RegExp('^' + email + '$', "i") });
    if (existingUser) return res.status(400).json({ error: 'User with this email already exists.' });

    // Ensure valid role
    if (!['admin', 'sales', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Use case-insensitive search for email
    const user = await User.findOne({ email: new RegExp('^' + email + '$', "i") });
    if (!user) return res.status(401).json({ error: 'User not found. Please check your email.' });

    if (role && user.role !== role) {
      return res.status(401).json({ error: `Invalid role selected. This account is registered as '${user.role}'.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password.' });

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { email: user.email }, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const deals = await Deal.countDocuments();
    // Calculate total revenue from deals
    const allDeals = await Deal.find();
    const revenue = allDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);
    const leads = await Lead.countDocuments();
    res.json({ deals, revenue, leads });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/deals', authenticateToken, async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/deals', authenticateToken, async (req, res) => {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.json(newDeal);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Leads APIs
app.get('/api/leads', authenticateToken, async (req, res) => {
  try {
    // Sort by newest
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/leads', authenticateToken, checkRole(['admin', 'sales']), async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Contacts APIs
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Meetings APIs
app.get('/api/meetings', authenticateToken, async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/meetings', authenticateToken, async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    await newMeeting.save();
    res.json(newMeeting);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Support Tickets APIs
app.get('/api/support', authenticateToken, async (req, res) => {
  try {
    const tickets = await SupportTicket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/support', authenticateToken, async (req, res) => {
  try {
    const newTicket = new SupportTicket(req.body);
    await newTicket.save();
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check for root
app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API v1.1 DB - Ready!' });
});

app.listen(PORT, () => {
  console.log(`CRM Backend running on http://localhost:${PORT}`);
});
