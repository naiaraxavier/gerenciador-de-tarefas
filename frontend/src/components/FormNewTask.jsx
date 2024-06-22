import PropTypes from 'prop-types';
import { useState } from 'react';
import '../css/form-new-task.css';
import { useParams } from 'react-router-dom';

function FormNewTask({ setIsFormOpen, onCreate }) {
  const [message, setMessage] = useState('');
  const [taskData, setTaskData] = useState({
    descricao: '',
    data: '',
    hora: '',
    repete: ''
  });

  const { id } = useParams();
  console.log(taskData, id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { descricao, data, hora, repete } = taskData;

    const task = {
      descricao,
      data,
      hora: `${data} ${hora}`,
      repete,
    }

    try {
      const response = await fetch(`http://localhost:3001/tasks/list/${id}`, {
        method: 'POST',
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
          repete: ''
        });
        setMessage('Tarefa criada com sucesso!');
        onCreate();
        setIsFormOpen(false);

      } else {
        setMessage('Erro ao criar a tarefa');
      }
    } catch (error) {
      setMessage('Erro ao criar a tarefa', error.message);
    }
  };


  return (
    <div className='form-task-modal'>
      <span className="close-tsk" onClick={() => setIsFormOpen(false)}>&times;</span>
      <form onSubmit={handleSubmit} className='form-task'>
        <h2>Nova tarefa</h2>

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
          >
            Criar
          </button>
        </div>

      </form>
    </div>
  )
}

FormNewTask.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default FormNewTask
