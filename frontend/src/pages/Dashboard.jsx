import { useEffect, useState, useContext } from 'react';
import FormNewList from '../components/FormNewList';
import AuthContext from '../context/AuthContext';
import defaultImage from '../img/avatar.png';
import Loading from '../components/Loading';
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import List from '../components/List';
import '../css/dashboard.css';

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientName, setClientName] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  // console.log(isFormOpen);
  // console.log(listData);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/lists/combined-data');
      const data = await response.json();
      setListData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar ícones da API:', error);
    }
  };


  useEffect(() => {
    // Verifica se o nome do usuário está no localStorage
    const storedName = localStorage.getItem('user');
    if (storedName) {
      const userObject = JSON.parse(storedName);
      if (userObject.email) {
        // Se sim, define o nome do usuário com o valor de "email"
        setClientName(userObject.email);
      }
    }

    fetchData();
  }, []);

  const emailParts = clientName.split('@');
  const name = emailParts[0];

  const handleFormClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <main className="dashboard">
      <div className="perfil-container">
        <div className='profile-content'>
          <div className='profile-image'>
            <img src={defaultImage} alt='profile' />
          </div>
          <h2>Olá {name.charAt(0).toUpperCase() + name.slice(1) || 'Fulano'}</h2>
          <h2>Volte a ter foco!</h2>
        </div>
        <div className='profile-buttons'>
          <button>Perfil</button>
          <button
            onClick={() => logout()}
          >
            Sair
          </button>
        </div>
      </div>

      <div className="lists-container">
        <div>
          <h1 className="dash-title">Visão geral das suas <span> listas de tarefas:</span></h1>
        </div>

        <div className='list-scroll'>
          {loading ? (
            <Loading />
          ) : (
            listData.length > 0 ? (
              listData && listData.map((list) => (
                <Link key={list.id_lista} to={`/list/${list.id_lista}`}>
                  <List listData={list} />
                </Link>
              ))
            ) : (
              <div className='message-new-list'>
                <p>Ops! Você não possui listas de tarefas</p>
                <p>Crie já a sua primeira lista!</p>
              </div>
            )
          )}
        </div>

        <div className='btn-new-list'>
          <button
            className="button-with-icon"
            onClick={handleFormClick}
          >
            <FaPlus id='plus' />
            <span>Nova Lista</span>
          </button>
        </div>
      </div>

      {isFormOpen && (
        <FormNewList setIsFormOpen={setIsFormOpen} onCreate={fetchData} />
      )}

    </main>
  )
}

export default Dashboard
