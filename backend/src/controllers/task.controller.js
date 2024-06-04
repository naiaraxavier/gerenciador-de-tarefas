const { taskModel } = require('../models');
const { getUserIdFromToken } = require('../utils/token');

// Cria a tarefa em uma lista
const createTask = async (req, res) => {
  try {
    // Extrair o ID da lista da URL
    const id_lista = req.params.id_lista;

    // Extrair os dados da tarefa do corpo da requisição
    const { descricao, data, hora, repete } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!descricao || !data || !hora || repete == null) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Criar a tarefa no banco de dados
    const newTaskId = await taskModel.create({ descricao, data, hora, repete, id_lista });

    // Retornar a resposta com o ID da tarefa criada
    res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: newTaskId });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

// Lista todas as tarefas cadastradas no banco de dados
const findAll = async (req, res) => {
  try {
    const id_lista = req.params.id_lista;
    const tasks = await taskModel.findAllByListId(id_lista);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

// Atualiza tarefa cadastrada no banco de dados
const updateTask = async (req, res) => {
  try {
    const id_lista = req.params.id_lista;
    const id_tarefa = req.params.id_tarefa;
    const { descricao, data, hora, repete } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!descricao || !data || !hora || repete == null) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const result = await taskModel.updateById(id_tarefa, { descricao, data, hora, repete, id_lista });

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Exclui uma tarefa do banco de dados
const deleteTask = async (req, res) => {
  try {
    const id_tarefa = req.params.id_tarefa;
    const result = await taskModel.remove(id_tarefa);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }

  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};


module.exports = {
  createTask,
  updateTask,
  findAll,
  deleteTask
};
