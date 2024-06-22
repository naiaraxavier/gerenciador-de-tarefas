import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useState, useContext } from 'react';
import img from '../img/img-login.png';
import '../css/login-register.css'

function Login() {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    senha: '',
  });

  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 6;

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // console.log(response);

      if (response.ok) {
        // Login bem-sucedido, armazenar o nome no local storage
        const data = await response.json();

        login(data.token)

        const userInfo = JSON.stringify({ email: userData.email });
        localStorage.setItem('user', userInfo);
        // Login bem-sucedido, redirecionar para a página principal
        navigate('/');
      } else {
        // Se ocorrer um erro, exibir mensagem de erro
        setErrorMessage('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }

  }

  return (
    <main className="login-background">
      <div className='login-container'>
        <div className="box-image">
          <img className="img-logo" src={img} alt="logo" />
        </div>

        <div className='box-form'>
          <h2 className="login-text">Bem vindo de volta!</h2>

          <label htmlFor="email-input" className="input-with-icon">
            <FaEnvelope className="icon" />
            <input
              className="login-input"
              type="text"
              id="email-input"
              value={userData.email}
              placeholder="Email"
              onChange={({ target }) => setUserData({ ...userData, email: target.value })}
            />
          </label>

          <label htmlFor="password-input" className="input-with-icon">
            <FaLock className="icon" />
            <input
              className="login-input"
              type="password"
              id="password-input"
              value={userData.senha}
              placeholder="Senha"
              onChange={({ target }) => setUserData({ ...userData, senha: target.value })}
            />
          </label>

          {errorMessage && <span>{errorMessage}</span>}

          <div className="button-enter">
            <button
              className="login-submit-btn"
              disabled={!(emailValidation.test(userData.email)
                && userData.senha.length >= MIN_PASSWORD_LENGTH)
              }
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>

          <p>
            Novo membro?
            <Link to="/register">
              <span> Registrar agora.</span>
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}

export default Login
