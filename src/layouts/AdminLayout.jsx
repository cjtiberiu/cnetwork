import { Routes, Route } from 'react-router-dom';
import SideNav from '../components/SideNav/SideNav';
import AddClient from '../pages/Admin/Clients/AddClient';
import RemoveClient from '../pages/Admin/Clients/RemoveClient';
import UpdateClient from '../pages/Admin/Clients/UpdateClient';
import ShowClients from '../pages/Admin/Clients/ShowClients';

const AdminLayout = (props) => {
    console.log(props);
    return (
        <div className="admin-layout">
            <SideNav />
            <div className="page-content">
                <Routes>
                    <Route exact path={`/clients/add`} element={<AddClient />} />
                    <Route exact path={`/clients/remove`} element={<RemoveClient />} />
                    <Route exact path={`/clients/update`} element={<UpdateClient />} />
                    <Route exact path={`/clients/show`} element={<ShowClients />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;
