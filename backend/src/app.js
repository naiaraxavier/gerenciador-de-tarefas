const { userRoutes, loginRoutes, listRoutes, taskRoutes } = require('./routes');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;
