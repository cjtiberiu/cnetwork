import { useState, useEffect } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import decodeToken from 'jwt-decode';
import { UserContext } from './context';
import ProtectedUserRoute from './routes/ProtectedUserRoute/ProtectedUserRoute';
import ProtectedAuthRoute from './routes/ProtectedAuthRoute/ProtectedAuthRoute';
import './custom-bootstrap.scss';

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

    const dispatchUserEvent = (actionType, payload) => {
        switch (actionType) {
            case 'SET_USER':
                console.log(payload);
                setUserData(payload);
                return;
            case 'REMOVE_USER':
                setUserData(null);
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, dispatchUserEvent }}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedUserRoute>
                            <HomePage />
                        </ProtectedUserRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedAuthRoute>
                            <Login />
                        </ProtectedAuthRoute>
                    }
                />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
