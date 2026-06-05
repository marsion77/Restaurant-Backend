require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// ── Database ──────────────────────────────────────────────────────────────────
require('./Config/db');

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow any localhost origin (supporting dynamic dev ports like 5173, 5174, etc.)
    if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    
    // Clean and compare origin
    const cleanOrigin = origin.replace(/\/$/, "").toLowerCase();
    const cleanClientUrl = (process.env.CLIENT_URL || "").replace(/\/$/, "").toLowerCase();
    
    // Allow the configured CLIENT_URL or the explicitly deployed Vercel URL
    if (
      cleanOrigin === cleanClientUrl || 
      cleanOrigin === "https://restaurant-frontend-seven-orpin.vercel.app" ||
      cleanOrigin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }
    
    return callback(null, false); // Block other origins
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ── Routers ───────────────────────────────────────────────────────────────────
const userRouter    = require('./Router/userRouter');
const categoryRouter = require('./Router/categoryRouter');
const menuRouter    = require('./Router/menuRouter');
const cartRouter    = require('./Router/cartRouter');
const orderRouter   = require('./Router/orderRouter');

app.use('/users',       userRouter);
app.use('/category',    categoryRouter);
app.use('/menu',        menuRouter);
app.use('/api/cart',    cartRouter);
app.use('/api/order',   orderRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ok', app: 'Sky Bowl API' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Unhandled Error:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Sky Bowl API running on port ${PORT}`);
});
