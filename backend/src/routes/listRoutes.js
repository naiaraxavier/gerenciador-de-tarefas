const express = require('express');
const { listController } = require('../controllers')
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

// Rota para criação da lista
router.post("/add", authMiddleware, listController.createList)

// Rota para listar listas cadastradas
router.get('/', listController.findAll);

// Rota para atualização da lista
router.put("/:id", listController.updateList)

// Rota para deletar uma lista
router.delete('/:id', listController.deleteList);

module.exports = router;
