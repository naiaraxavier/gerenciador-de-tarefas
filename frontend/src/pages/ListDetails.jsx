import { useParams, useNavigate } from 'react-router-dom';
import FormNewTask from "../components/FormNewTask";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import Task from "../components/Task";
import '../css/list-details.css'

function ListDetails() {
  const [tasks, setTasks] = useState();
  const [infoList, setInfoList] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectData, setSelectData] = useState('hoje');
  const [completedTasks, setCompletedTasks] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  console.log(infoList);

  console.log(completedTasks);

  const fetchData = async () => {
    try {
      const response1 = await fetch(`http://localhost:3001/tasks/list/${id}`);
      const dataTasks = await response1.json();
      setTasks(dataTasks);

      const response2 = await fetch('http://localhost:3001/lists/combined-data');
      const data = await response2.json();

      const infoListFilter = data.filter(({ id_lista }) => id_lista === Number(id))

      const [{ nome_lista, caminho_icone }] = infoListFilter;

      setInfoList({ nome_lista, caminho_icone })

    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectData(value)
  };

  const handleFormClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  // Função para filtrar as tarefas com base na opção selecionada em selectData
  const filteredTasks = tasks && tasks.filter(task => {
    // Obter a data de hoje no fuso horário local
    const today = new Date();
    const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().slice(0, 10);
    // Obter a data de amanhã no fuso horário local
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().slice(0, 10);

    if (selectData === 'hoje') {
      return task.data.slice(0, 10) === localToday;
    } else if (selectData === 'amanha') {
      return task.data.slice(0, 10) === tomorrow;
    }
    return true;
  });

  // console.log(filteredTasks);

  const handleToggleComplete = (task, isCompleted) => {
    if (isCompleted) {
      // Adicionar tarefa concluída à lista de tarefas concluídas
      setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, task]);
    } else {
      // Remover tarefa concluída da lista de tarefas concluídas
      setCompletedTasks(prevCompletedTasks => prevCompletedTasks.filter(t => t.id_tarefa !== task.id_tarefa));
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Chama a rota de exclusão do backend
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove a tarefa da lista de tarefas
        const updatedTasks = tasks.filter(task => task.id_tarefa !== taskId);
        setTasks(updatedTasks);

        // Remove a tarefa do localStorage
        const savedCompleted = JSON.parse(localStorage.getItem('completedTasks')) || [];
        localStorage.setItem('completedTasks', JSON.stringify(savedCompleted.filter(id => id !== taskId)));
      } else {
        console.error('Erro ao excluir tarefa do backend');
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handlDeleteList = async () => {
    try {
      // Chama a rota de exclusão do backend
      const response = await fetch(`http://localhost:3001/lists/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Recupera os ícones selecionados do localStorage
        const selectedIcons = JSON.parse(localStorage.getItem('selectedIcons')) || [];

        // Remove o ícone correspondente ao ID da lista excluída
        const updatedSelectedIcons = selectedIcons.filter(icon => icon.caminho_icone !== infoList.caminho_icone);

        // Atualiza os ícones selecionados no localStorage
        localStorage.setItem('selectedIcons', JSON.stringify(updatedSelectedIcons));
        navigate('/');
      } else {
        console.error('Erro ao excluir lista do banco de dados');
      }
    } catch (error) {
      console.error('Erro ao excluir lista:', error);
    }
  }

  return (
    <main className="list-details-container">
      <div className='info-list-container'>

        {infoList && (
          <div className='info-content'>
            <div className='info-image'>
              <img src={infoList.caminho_icone} alt='Icone da tarefa' />
            </div>
            <h2>{infoList.nome_lista}</h2>
          </div>
        )}

        <div className="btn-edit-delete">
          <FaEdit className="edit-btn" />
          <RiDeleteBin6Fill className="delete-btn" onClick={handlDeleteList} />
        </div>

      </div>

      <div className="list-tasks-container">
        <div className="container-list">
          <div className="container-select">
            <select
              id="data-dropdown"
              value={selectData}
              onChange={handleSelectChange}
            >
              <option value={"hoje"}>Tarefas de hoje</option>
              <option value={"amanha"}>Tarefas de amanhã</option>
            </select>
          </div>

          <div>
            {/* Tarefas concluídas */}
          </div>

          <div className="tasks-list">
            {/* Tarefas a fazer */}
            {filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task
                  key={task.id_tarefa}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <span>Vocẽ não tem tarefas agendadas</span>
            )}
          </div>

          <div className="btn-add-task">
            <button
              className="icon-add-task"
              onClick={handleFormClick}
              disabled={isFormOpen === true}
            >
              <FaCirclePlus />
            </button>

          </div>
        </div>
      </div>

      {isFormOpen && (
        <FormNewTask setIsFormOpen={setIsFormOpen} onCreate={fetchData} />
      )}

    </main>
  )
}

export default ListDetails
