const express = require('express');
const { taskController } = require('../controllers')

const router = express.Router();

// Rota para criação da tarefa
router.post("/list/:id_lista", taskController.createTask)

// Rota para listar tarefas cadastradas
router.get("/list/:id_lista", taskController.findAll);

// Rota para atualização da tarefa
router.put("/list/:id_lista/:id_tarefa", taskController.updateTask)

// Rota para deletar uma tarefa
router.delete('/:id_tarefa', taskController.deleteTask);

module.exports = router;
