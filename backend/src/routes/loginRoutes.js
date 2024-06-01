const express = require('express');
const { usersController } = require('../controllers/')
const { validateLoginFields } = require('../middlewares/checkLogin');

const router = express.Router();

// Rota de login do Usuário
router.post('/', validateLoginFields, usersController.login);

module.exports = router;
