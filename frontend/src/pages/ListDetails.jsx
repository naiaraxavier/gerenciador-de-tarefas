import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/list-details.css'

function ListDetails() {
  const [tasks, setTasks] = useState();
  const [infoList, setInfoList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  console.log(tasks, isLoading, infoList);

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

      setIsLoading(false);

    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
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
          <RiDeleteBin6Fill className="delete-btn" />
        </div>

      </div>
    </main>
  )
}

export default ListDetails
