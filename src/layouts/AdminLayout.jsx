import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import AddClient from '../pages/Admin/Clients/AddClient';
import RemoveClient from '../pages/Admin/Clients/RemoveClient';
import UpdateClient from '../pages/Admin/Clients/UpdateClient';
import ListClients from '../pages/Admin/Clients/ListClients';
import AddUser from '../pages/Admin/Users/AddUser';
import RemoveUser from '../pages/Admin/Users/RemoveUser';
import UpdateUser from '../pages/Admin/Users/UpdateUser';
import ListUsers from '../pages/Admin/Users/ListUsers';

const AdminLayout = (props) => {
  return (
    <>
      <Header />
      <SideNav />
      <main className="main">
        <Routes>
          <Route exact path={`/admin/clients/add`} element={<AddClient />} />
          <Route exact path={`/clients/remove`} element={<RemoveClient />} />
          <Route exact path={`/clients/update`} element={<UpdateClient />} />
          <Route exact path={`/clients/show`} element={<ListClients />} />
          <Route exact path={`/users/add`} element={<AddUser />} />
          <Route exact path={`/users/remove`} element={<RemoveUser />} />
          <Route exact path={`/users/update`} element={<UpdateUser />} />
          <Route exact path={`/users/show`} element={<ListUsers />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminLayout;
