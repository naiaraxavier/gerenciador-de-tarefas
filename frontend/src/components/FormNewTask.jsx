import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../css/form-new-task.css';

function FormNewTask({ setIsFormOpen, onCreate }) {
  const [taskData, setTaskData] = useState({
    descricao: '',
    data: '',
    hora: '',
    repete: ''
  });

  console.log(taskData);

  return (
    <div className='form-task-modal'>
      <span className="close-tsk" onClick={() => setIsFormOpen(false)}>&times;</span>
      <form className='form-task'>
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

            {/* {message && <div className='message-list'><span>{message}</span></div>} */}
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
