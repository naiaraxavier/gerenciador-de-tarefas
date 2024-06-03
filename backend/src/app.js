const express = require('express');
require('dotenv').config();
const { userRoutes, loginRoutes, listRoutes, taskRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;
