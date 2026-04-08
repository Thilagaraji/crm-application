const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'crm-secret-key-123'; // In prod, use env var

app.use(cors());
app.use(express.json());

// Mock DB
let leads = [
  { _id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456', source: 'Website', status: 'New', createdAt: new Date() },
  { _id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '789-012', source: 'Referral', status: 'Contacted', createdAt: new Date() }
];
let users = [
  { id: 1, email: 'admin@CRM.com', password: '$2a$10$mockhashadmin', role: 'admin' }, // bcrypt hash for 'admin123'
  { id: 2, email: 'sales@CRM.com', password: '$2a$10$mockhashsales', role: 'sales' },
  { id: 3, email: 'user@CRM.com', password: '$2a$10$mockhashuser', role: 'user' }
];

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

// Existing APIs (preserve for future)
app.get('/api/dashboard', (req, res) => {
  res.json({ deals: 15, revenue: 125000, leads: 8 });
});

app.get('/api/deals', (req, res) => {
  res.json([]);
});
app.post('/api/deals', (req, res) => {
  res.json({ ...req.body, _id: Date.now() });
});

app.get('/api/tasks', (req, res) => {
  res.json([]);
});
app.post('/api/tasks', (req, res) => {
  res.json({ ...req.body, _id: Date.now() });
});

// New Auth API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email /* && bcrypt.compareSync(password, u.password) */);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Mock token (no real bcrypt for demo)
  const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { email: user.email }, role: user.role });
});

// Health check for root
app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API v1.0 - Ready!', endpoints: ['/api/login', '/api/dashboard', '/api/leads', '/api/deals', '/api/tasks'] });
});

// New Leads APIs (RBAC protected)
app.get('/api/leads', authenticateToken, (req, res) => {
  res.json(leads);
});

app.post('/api/leads', authenticateToken, checkRole(['admin', 'sales']), (req, res) => {
  const newLead = { _id: Date.now(), ...req.body, createdAt: new Date() };
  leads.push(newLead);
  res.json(newLead);
});

app.listen(PORT, () => {
  console.log(`CRM Backend running on http://localhost:${PORT}`);
});

