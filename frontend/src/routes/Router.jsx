import { Route, Routes } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import ListDetails from '../pages/ListDetails';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { useContext } from 'react';

function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  // console.log(isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element=
        {
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            element={Dashboard}
          />
        }
      />
      <Route
        path="/list/:id"
        element=
        {
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            element={ListDetails}
          />
        }
      />
    </Routes>
  )
}

export default Router
