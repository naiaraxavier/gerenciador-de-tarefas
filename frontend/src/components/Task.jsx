import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';
import '../css/task.css';

function Task({ task, onToggleComplete, onDelete }) {
  const [completed, setCompleted] = useState(false);

  console.log(completed);


  const handleCheckboxChange = () => {
    setCompleted(!completed);
    onToggleComplete(task, completed);

    // Salvar no localStorage
    const savedCompleted = JSON.parse(localStorage.getItem('completedTasks')) || [];
    if (!completed) {
      localStorage.setItem('completedTasks', JSON.stringify([...savedCompleted, task.id_tarefa]));
    } else {
      localStorage.setItem('completedTasks', JSON.stringify(savedCompleted.filter(id => id !== task.id_tarefa)));
    }
  };

  const hoursFormated = (hoursData) => {
    const dataHours = hoursData;
    const hours = new Date(dataHours).getUTCHours();
    const minutos = new Date(dataHours).getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    // Carregar estado inicial do localStorage
    const savedCompleted = JSON.parse(localStorage.getItem('completedTasks')) || [];
    if (savedCompleted.includes(task.id_tarefa)) {
      setCompleted(true);
    }
  }, [task.id_tarefa]);

  const handleDeleteClick = () => {
    onDelete(task.id_tarefa);
  };


  return (
    <div className={`container-task ${completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input
          type="checkbox"
          id={`task-${task.id_tarefa}`}
          checked={completed}
          onChange={handleCheckboxChange}
          className="custom-checkbox"
        />

        <div>
          <label htmlFor={`task-${task.id_tarefa}`}>{task.descricao}</label>
          <p>{hoursFormated(task.hora)} hrs</p>
        </div>

      </div>

      <div className="btn-edit-delete-task">
        <FaEdit className="edit-task-btn" />
        <RiDeleteBin6Fill className="delete-task-btn" onClick={handleDeleteClick} />
      </div>

    </div>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    id_lista: PropTypes.number.isRequired,
    id_tarefa: PropTypes.number.isRequired,
    repete: PropTypes.number.isRequired,
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default Task
