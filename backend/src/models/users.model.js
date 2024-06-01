const conn = require('./connection');

// Insere um usuário no banco de dados
const insert = async (user) => {
  const query = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;
  const [{ insertId }] = await conn.execute(query, [user.nome, user.email, user.senha]);
  return insertId;
};


// Lista os usuários cadastrados no banco de dados
const findAll = async () => {
  const [users] = await conn.execute('SELECT * FROM usuario');
  return users
}


// Encontra um usuário pelo id
const findById = async (id) => {
  const [[user]] = await conn.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
  return user;
}

// Encontra um usuário pelo email
const findByEmail = async (email) => {
  const [[user]] = await conn.execute('SELECT * FROM usuario WHERE email = ?', [email]);
  return user;
}


// Atualiza dados de um usuário cadastrado no banco de dados
const update = async (user, id) => {
  const query = `UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id_usuario = ?`;
  const [result] = await conn.execute(query, [user.nome, user.email, user.senha, id]);
  return result;
}


// Exclui um usuário do banco de dados
const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM usuario WHERE id_usuario = ?', [id]);
  return result;
}


module.exports = {
  insert,
  findAll,
  findById,
  findByEmail,
  update,
  remove
};
