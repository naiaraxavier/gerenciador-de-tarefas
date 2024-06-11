import PropTypes from 'prop-types';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';

function Task({ task, onToggleComplete }) {
  const [completed, setCompleted] = useState(false);

  console.log(completed);


  const handleCheckboxChange = () => {
    setCompleted(!completed);
    onToggleComplete(task, completed);
  };

  const hoursFormated = (hoursData) => {
    const dataHours = hoursData;
    const hours = new Date(dataHours).getUTCHours();
    const minutos = new Date(dataHours).getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }


  return (
    <div>
      <div>
        <input
          type="checkbox"
          id={`task-${task.id_tarefa}`}
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`task-${task.id_tarefa}`}>{task.descricao}</label>

        <p>{hoursFormated(task.hora)} hrs</p>
      </div>

      <div className="btn-edit-delete">
        <FaEdit className="edit-task-btn" />
        <RiDeleteBin6Fill className="delete-task-btn" />
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
};


export default Task
