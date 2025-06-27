const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🎉 Connected to MongoDB - Inventors Community Todo App');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Routes
app.use('/api/todos', require('./routes/todos'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Inventors Community Todo API is running!',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Welcome to Inventors Community Todo API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            todos: '/api/todos'
        },
        copyright: '© 2024 Inventors Community'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🌟 Inventors Community Todo Server running on port ${PORT}`);
        console.log(`📝 API available at http://localhost:${PORT}`);
        console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    });
};

startServer();

module.exports = app; 