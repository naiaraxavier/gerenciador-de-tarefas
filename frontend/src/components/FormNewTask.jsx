import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../css/form-new-task.css';
import { useParams } from 'react-router-dom';

function FormNewTask({ setIsFormOpen, onCreate, isEditing, setIsEditing, editTask }) {
  const [message, setMessage] = useState('');
  const [taskData, setTaskData] = useState({
    descricao: '',
    data: '',
    hora: '',
    repete: false
  });

  const { id } = useParams();
  console.log(taskData, id);
  console.log(editTask)

  useEffect(() => {
    if (isEditing && editTask) {
      setTaskData({
        descricao: editTask.descricao || '',
        data: editTask.data || '',
        hora: editTask.hora ? editTask.hora.split(' ')[1] : '', // Extrair a hora
        repete: editTask.repete || false
      });
    }
  }, [isEditing, editTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { descricao, data, hora, repete } = taskData;

    const task = {
      descricao,
      data,
      hora: `${data} ${hora}`,
      repete,
    };

    try {
      const response = await fetch(`http://localhost:3001/tasks/list/${id}/${isEditing ? `${editTask.id_tarefa}` : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        setTaskData({
          descricao: '',
          data: '',
          hora: '',
          repete: false
        });
        setMessage(`Tarefa ${isEditing ? 'editada' : 'criada'} com sucesso!`);
        onCreate();
        setIsFormOpen(false);
        setIsEditing(false);

      } else {
        setMessage(`Erro ao ${isEditing ? 'editar' : 'criar'} a tarefa`);
      }
    } catch (error) {
      setMessage(`Erro ao ${isEditing ? 'editar' : 'criar'} a tarefa: ${error.message}`);
    }
  };


  return (
    <div className='form-task-modal'>
      <span className="close-tsk" onClick={() => { setIsFormOpen(false); setIsEditing(false) }}>&times;</span>
      <form onSubmit={handleSubmit} className='form-task'>
        <h2>{isEditing ? "Editar" : "Nova"} tarefa</h2>

        <div className='inputs-container'>
          <div className='description-task'>
            <label htmlFor='description-task'>Tarefa</label>
            <input
              type="text"
              id="description-task"
              name="description-task"
              placeholder="Descreva a sua tarefa"
              value={taskData.descricao}
              onChange={(e) => setTaskData({ ...taskData, descricao: e.target.value })}
            />
          </div>

          <div className='data-time'>
            <div className="input-data">
              <label htmlFor="date-input">Data</label>
              <input
                type="date"
                id="date-input"
                name="date-input"
                value={taskData.data}
                onChange={(e) => setTaskData({ ...taskData, data: e.target.value })}
              />
            </div>

            <div className="input-time">
              <label htmlFor="time-input">Hora</label>
              <input
                type="time"
                id="time-input"
                name="time-input"
                value={taskData.hora}
                onChange={(e) => setTaskData({ ...taskData, hora: e.target.value })}
              />
            </div>
          </div>

          <div className='repeat'>
            <input
              type="checkbox"
              id="repeat-input"
              name="repeat-input"
              checked={taskData.repete}
              onChange={(e) => setTaskData({ ...taskData, repete: e.target.checked })}
            />
            <label htmlFor="repeat-input" className="repeat-label">Repete</label>

            {message && <div className='message-list'><span>{message}</span></div>}
          </div>
        </div>

        <div className='btn-create-task'>
          <button
            type="submit"
            disabled={taskData.descricao.length < 5 || !taskData.data || !taskData.hora}
          // onClick={setIsEditing(false)}
          >
            {isEditing ? "Editar" : "Criar"}
          </button>
        </div>

      </form>
    </div>
  )
}

FormNewTask.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.bool.isRequired,
  editTask: PropTypes.shape({
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    id_lista: PropTypes.number.isRequired,
    id_tarefa: PropTypes.number.isRequired,
    repete: PropTypes.number.isRequired,
  }).isRequired,
};

export default FormNewTask
