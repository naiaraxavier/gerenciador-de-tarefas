const { listModel } = require('../models');
const { getUserIdFromToken } = require('../utils/token');

// Cria lista para organizar as tarefas
const createList = async (req, res) => {
  try {
    // Capture o ID do usuário logado
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserIdFromToken(token);
    // console.log("OIII", userId);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Outros dados da lista recebidos no corpo da requisição
    const { nome_lista, id_icone } = req.body;

    // Crie a nova lista
    const novaListaId = await listModel.create({
      nome_lista: nome_lista,
      id_usuario: userId,
      id_icone: id_icone
    });

    res.status(201).json({ id: novaListaId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Erro ao criar a lista.' });
  }
};

// Lista todas as listas cadastradas no banco de dados
const findAll = async (_req, res) => {
  try {
    const lists = await listModel.findAll();
    res.status(200).json(lists);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
};

// Atualiza lista cadastrada no banco de dados
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = req.body;
    const result = await listModel.update(list, id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Lista de id ${id} atualizada com sucesso` });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
};

// Exclui uma lista do banco de dados
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await listModel.remove(id);
    // console.log('Delete list result:', result);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Lista de id ${id} excluída com sucesso` });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.sqlMessage });
  }
}

module.exports = {
  createList,
  updateList,
  findAll,
  deleteList
};
