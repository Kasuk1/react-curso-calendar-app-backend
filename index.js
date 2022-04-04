const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Create express server
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Read and parse of body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
