import { FaPlus } from "react-icons/fa";
import '../css/dashboard.css'

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="perfil-container">
        <div>
          <img />
          <h2>Olá fulano, volte a ter foco.</h2>
        </div>
        <div>
          <button>Perfil</button>
          <button>Sair</button>
        </div>
      </div>

      <div className="lists-container">
        <div>
          <h1 className="dash-title">Visão geral das suas <span> listas de tarefas:</span></h1>
        </div>

        <div>
          <button>
            <FaPlus />
            Nova Lista
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
