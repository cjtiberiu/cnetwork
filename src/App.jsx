import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import decodeToken from 'jwt-decode';
import { UserContext } from './context';
import LoginLayout from './layouts/LoginLayout';
import UserLayout from './layouts/DashboardLayout';
import ProtectedUserRoute from './routes/ProtectedUserRoute/ProtectedUserRoute';
import ProtectedAuthRoute from './routes/ProtectedAuthRoute/ProtectedAuthRoute';
import "./custom-bootstrap.scss";

function App() {
  const [userData, setUserData] = useState(() => {
    if (localStorage.getItem('authToken')) {
      let token = JSON.parse(localStorage.getItem('authToken'));
      let decodedToken = decodeToken(token);
      const date = Date.now();

      if (decodedToken.exp * 1000 < date) {
        localStorage.removeItem('authToken');
        return null;
      }

      return decodedToken;
    }

    return null;
  });

  useEffect(() => {
    console.log('userData', userData)
  }, [userData]);

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'SET_USER':
        setUserData(payload);
        return;
      case 'REMOVE_USER':
        setUserData(null);
        return;
      default:
        return;
    }
  };

  return (
    <UserContext.Provider value={{ userData, dispatchUserEvent }}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login/*"
            element={
              <ProtectedAuthRoute>
                <LoginLayout />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedUserRoute>
                <UserLayout />
              </ProtectedUserRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              userData ? (
                <Navigate to="/dashboard" replace={true} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
