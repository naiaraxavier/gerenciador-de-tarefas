const conn = require('./connection');

// Insere uma lista no banco de dados
const create = async (list) => {
  const query = `INSERT INTO lista (nome_lista, id_usuario, id_icone) VALUES (?, ?, ?)`;
  const [{ insertId }] = await conn.execute(query, [list.nome_lista, list.id_usuario, list.id_icone]);
  return insertId;
};


// Lista as listas cadastradas no banco de dados
const findAll = async () => {
  const [lists] = await conn.execute('SELECT * FROM lista');
  return lists
}

// Lista os ícones cadastrados no banco de dados
const findAllIcones = async () => {
  const [icones] = await conn.execute('SELECT * FROM icone');
  return icones
}


// Atualiza dados de uma lista cadastrada no banco de dados
const update = async (list, id) => {
  const query = `UPDATE lista SET nome_lista = ?, id_icone = ? WHERE id_lista = ?`;
  const [result] = await conn.execute(query, [list.nome_lista, list.id_icone, id]);
  return result;
}


// Exclui uma lista do banco de dados
const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM lista WHERE id_lista = ?', [id]);
  return result;
}


module.exports = {
  create,
  findAll,
  update,
  remove,
  findAllIcones
};
