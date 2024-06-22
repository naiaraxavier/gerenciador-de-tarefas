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

// Lista os ícones/listas e tarefas cadastradas no banco de dados
const findAllWithJoin = async () => {
  const [rows] = await conn.execute(`
    SELECT
      lista.id_lista,
      lista.nome_lista,
      lista.id_usuario,
      icone.caminho_icone,
      tarefa.id_tarefa,
      tarefa.descricao
    FROM
      lista
    INNER JOIN
      icone ON lista.id_icone = icone.id_icone
    LEFT JOIN
      tarefa ON lista.id_lista = tarefa.id_lista
  `);

  const lists = [];

  rows.forEach(row => {
    let list = lists.find(l => l.id_lista === row.id_lista);
    if (!list) {
      list = {
        id_lista: row.id_lista,
        nome_lista: row.nome_lista,
        id_usuario: row.id_usuario,
        caminho_icone: row.caminho_icone,
        tarefas: []
      };
      lists.push(list);
    }
    if (row.id_tarefa) {
      list.tarefas.push({
        id_tarefa: row.id_tarefa,
        descricao_tarefa: row.descricao_tarefa
      });
    }
  });

  return lists;
};


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
  remove,
  create,
  update,
  findAll,
  findAllIcones,
  findAllWithJoin
};
