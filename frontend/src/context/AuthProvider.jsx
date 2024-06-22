import { useState, useMemo, useEffect } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica se há um token armazenado no localStorage
    const token = localStorage.getItem('token');
    return !!token; // Converte a presença do token para um booleano
  });

  // Atualiza o localStorage sempre que o estado autenticado mudar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    } else {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
    }
  }, [isAuthenticated]);

  // Função para realizar o login
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Função para realizar o logout
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const values = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout
  }), [isAuthenticated, setIsAuthenticated]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider
