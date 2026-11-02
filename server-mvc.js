require('dotenv').config();
const express = require('express');
const path = require('path'); // <-- This is the missing piece!
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// This serves your HTML/CSS/JS from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`MVC server running at http://localhost:${PORT}`);
});