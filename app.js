const express = require('express');
const productRoutes = require('./routes/productRoutes');
const { requestLogger } = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/', productRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
