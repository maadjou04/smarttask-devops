const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'smarttask-backend' });
});

app.use('/api/tasks', tasksRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SmartTask backend démarré sur le port ${PORT}`);
});
