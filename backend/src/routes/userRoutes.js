const express = require('express');
const { usersController } = require("../controllers")
const { validateUserFields } = require('../middlewares/checkUser');

const router = express.Router();

// Rota para criação de conta de usuários
router.post('/add', validateUserFields, usersController.createUser);


// Rota para listar os usuários cadastrados
router.get('/', usersController.findAll);


// Rota de Atualização de dados de usuários
router.put('/:id', usersController.updateUser);


// Rota para deletar um usuário
router.delete('/:id', usersController.deleteUser);

module.exports = router;
