// backend/server.js
const path    = require('path');
const express = require('express');
require('dotenv').config();     // 1️⃣  Load environment vars first

const app  = express();
const cors = require('cors');

// 2️⃣  Connect to MongoDB
require('./db');

// 3️⃣  Global middleware
app.use(cors());
app.use(express.json());

// 4️⃣  Mount API routes BEFORE static files
console.log('✅ Mounting routers...');
app.use('/user',      require('./routes/userRoutes.js'));
app.use('/candidate', require('./routes/candidateRoutes.js'));
console.log('✅ Routers mounted');

// 5️⃣  Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// 6️⃣  Root path → index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 7️⃣  404 handler
app.use((req, res) => {
  console.warn('⚠️  404 for', req.method, req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// 8️⃣  Global error handler
app.use((err, _req, res, _next) => {
  console.error('❌  Uncaught error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 9️⃣  Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Server listening on port ${PORT}`);
});
