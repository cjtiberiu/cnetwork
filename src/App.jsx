import { useState, useEffect } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import decodeToken from 'jwt-decode';
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

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <Routes>
            <Route path="/" element={userData ? <HomePage setUserData={setUserData} /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login setUserData={setUserData} userData={userData} />} />
        </Routes>
    );
}

export default App;
