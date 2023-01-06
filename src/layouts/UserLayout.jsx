import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../pages/HomePage/HomePage';
import ClientsPage from '../pages/Clients/Clients';

const UserLayout = (props) => {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path={`/`} element={<HomePage />} />
                <Route exact path={`/clients`} element={<ClientsPage />} />
            </Routes>
        </>
    );
};

export default UserLayout;
