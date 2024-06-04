import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import img from '../img/img-login.png';
import { useState } from 'react';
import '../css/login-register.css'


function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 6;

  const handleSignUp = async () => {
    try {
      if (userData.senha !== confirmPassword) {
        setErrorMessage('As senhas não coincidem');
        return;
      }

      const response = await fetch('http://localhost:3001/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (response.ok) {
        // Login bem-sucedido, redirecionar para a página principal
        setErrorMessage('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        // Se ocorrer um erro, exibir mensagem de erro
        setErrorMessage('Erro ao cadastrar usuário');
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
          <h2 className="login-text">Comece a fazer as coisas AGORA!</h2>

          <label htmlFor="name-input" className="input-with-icon">
            <IoPerson className='icon' />
            <input
              className="login-input"
              type="text"
              id="name-input"
              value={userData.nome}
              placeholder="Nome Completo"
              onChange={({ target }) => setUserData({ ...userData, nome: target.value })}
            />
          </label>

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
              placeholder="Criar Senha"
              onChange={({ target }) => setUserData({ ...userData, senha: target.value })}
            />
          </label>

          <label htmlFor="password-input" className="input-with-icon">
            <FaLock className="icon" />
            <input
              className="login-input"
              type="password"
              id="password-input"
              value={confirmPassword}
              placeholder="Confirmar Senha"
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </label>

          {errorMessage && <span>{errorMessage}</span>}

          <div className="button-enter">
            <button
              className="login-submit-btn"
              disabled={!(emailValidation.test(userData.email)
                && userData.senha.length && confirmPassword >= MIN_PASSWORD_LENGTH)
              }
              onClick={handleSignUp}
            >
              Cadastrar
            </button>
          </div>

          <p>
            Já tem uma conta?
            <Link to="/login">
              <span> Entrar.</span>
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}

export default Register
