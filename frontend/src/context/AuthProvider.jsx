import { useState, useMemo, useEffect } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica se há um estado autenticado armazenado no localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    // Se houver, converte para booleano
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // console.log(isAuthenticated, "auth");

  // Atualiza o localStorage sempre que o estado autenticado mudar
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const values = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
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
