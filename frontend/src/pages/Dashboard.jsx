import FormNewList from '../components/FormNewList';
import defaultImage from '../img/avatar.png'
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import '../css/dashboard.css'

function Dashboard() {
  const [clientName, setClientName] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  // console.log(isFormOpen);

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
          <button>Sair</button>
        </div>
      </div>

      <div className="lists-container">
        <div>
          <h1 className="dash-title">Visão geral das suas <span> listas de tarefas:</span></h1>
        </div>

        <div>
          {/* Lista de tarefas */}
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
        <FormNewList setIsFormOpen={setIsFormOpen} />
      )}

    </main>
  )
}

export default Dashboard
