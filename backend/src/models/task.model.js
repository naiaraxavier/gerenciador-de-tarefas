const conn = require('./connection');

// Insere uma tarefa no banco de dados
const create = async (task) => {
  const query = `INSERT INTO tarefa (descricao, data, hora, repete, id_lista) VALUES (?, ?, ?, ?, ?)`;
  const [{ insertId }] = await conn.execute(query, [task.descricao, task.data, task.hora, task.repete, task.id_lista]);
  return insertId;
};


// Lista as tarefas cadastradas no banco de dados
const findAllByListId = async (id_lista) => {
  const [lists] = await conn.execute('SELECT * FROM tarefa WHERE id_lista = ?', [id_lista]);
  return lists
}


// Atualiza dados de uma tarefa cadastrada no banco de dados
const updateById = async (id, task) => {
  const query = `UPDATE tarefa SET descricao = ?, data = ?, hora = ?, repete = ?, id_lista = ? WHERE id_tarefa = ?`;
  const [result] = await conn.execute(query, [task.descricao, task.data, task.hora, task.repete, task.id_lista, id]);
  return result;
};


// Exclui uma tarefa do banco de dados
const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM tarefa WHERE id_tarefa = ?', [id]);
  return result;
}


module.exports = {
  create,
  findAllByListId,
  updateById,
  remove
};
