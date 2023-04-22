import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../pages/User/HomePage/HomePage';
import ClientsPage from '../pages/User/Clients/Clients';
import WorkLogs from '../pages/User/WorkLogs/WorkLogs';

const UserLayout = (props) => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path={`/`} element={<HomePage />} />
        <Route exact path={`/clients`} element={<ClientsPage />} />
        <Route exact path={`/logs`} element={<WorkLogs />} />
      </Routes>
    </>
  );
};

export default UserLayout;
