import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import AddClient from '../pages/Admin/Clients/AddClient';
import RemoveClient from '../pages/Admin/Clients/RemoveClient';
import UpdateClient from '../pages/Admin/Clients/UpdateClient';
import ShowClients from '../pages/Admin/Clients/ShowClients';
import AddEmployee from '../pages/Admin/Employees/AddEmployee';
import RemoveEmployee from '../pages/Admin/Employees/RemoveEmployee';
import UpdateEmployee from '../pages/Admin/Employees/UpdateEmployee';
import ShowEmployees from '../pages/Admin/Employees/ShowEmployees';

const AdminLayout = (props) => {
  return (
    <>
      <Header />
      <SideNav />
      <main className="main">
        <Routes>
          <Route exact path={`/clients/add`} element={<AddClient />} />
          <Route exact path={`/clients/remove`} element={<RemoveClient />} />
          <Route exact path={`/clients/update`} element={<UpdateClient />} />
          <Route exact path={`/clients/show`} element={<ShowClients />} />
          <Route exact path={`/employees/add`} element={<AddEmployee />} />
          <Route exact path={`/employees/remove`} element={<RemoveEmployee />} />
          <Route exact path={`/employees/update`} element={<UpdateEmployee />} />
          <Route exact path={`/employees/show`} element={<ShowEmployees />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminLayout;
