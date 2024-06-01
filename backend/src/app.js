const express = require('express');
const { userRoutes, loginRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', loginRoutes);

module.exports = app;
