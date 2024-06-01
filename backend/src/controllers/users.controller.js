const { usersModel } = require('../models');

// Criação de usuário/conta de usuário
const createUser = async (req, res) => {
  const user = req.body;
  try {
    const id = await usersModel.insert(user);
    res.status(201).json({
      message: `Conta de usuário cadastrado com sucesso: id ${id}`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar a conta' });
  }
};


// Lista todos os usuários cadastrados no banco de dados
const findAll = async (_req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
};


// Atualiza usuário cadastrado no banco de dados
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const result = await usersModel.update(user, id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
};


// Exclui um usuário do banco de dados
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersModel.remove(id);
    // console.log('Delete user result:', result);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} excluída com sucesso` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.sqlMessage });
  }
}


// Login do Usuário
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const result = await usersModel.findByEmail(email);
    // console.log(result);
    if (result && result.senha === senha) {
      return res.status(200).json({ message: `Login realizado com sucesso` });
    } else {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createUser,
  updateUser,
  findAll,
  deleteUser,
  login
};
