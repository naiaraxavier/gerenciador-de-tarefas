import PropTypes from 'prop-types';
import '../css/list.css'

function List({ listData }) {
  return (
    <div className='div-list'>
      <div className='img-icon'>
        <img src={listData.caminho_icone} alt="Ícone" />
      </div>

      <div className='info-list'>
        <h2>{listData.nome_lista}</h2>
        <p>
          {listData && listData.tarefas.length > 1
            ? `${listData.tarefas.length} tarefas`
            : `${listData.tarefas.length} tarefa`}
        </p>
      </div>
    </div>
  )
}

List.propTypes = {
  listData: PropTypes.shape({
    caminho_icone: PropTypes.string.isRequired,
    nome_lista: PropTypes.string.isRequired,
    tarefas: PropTypes.arrayOf(
      PropTypes.shape({
        id_tarefa: PropTypes.number.isRequired,
        descricao_tarefa: PropTypes.string.isRequired
      })
    ).isRequired,
  }).isRequired,
};

export default List
