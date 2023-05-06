import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import HomePage from '../pages/User/HomePage/HomePage';
import ClientsPage from '../pages/User/Clients/Clients';
import WorkLogs from '../pages/User/WorkLogs/WorkLogs';
import AddClient from '../pages/Admin/Clients/AddClient';
import RemoveClient from '../pages/Admin/Clients/RemoveClient';
import UpdateClient from '../pages/Admin/Clients/UpdateClient';
import ShowClients from '../pages/Admin/Clients/ShowClients';
import AddEmployee from '../pages/Admin/Employees/AddEmployee';
import RemoveEmployee from '../pages/Admin/Employees/RemoveEmployee';
import UpdateEmployee from '../pages/Admin/Employees/UpdateEmployee';
import ShowEmployees from '../pages/Admin/Employees/ShowEmployees';
import ProtectedUserRoute from '../routes/ProtectedUserRoute/ProtectedUserRoute';
import ProtectedAdminRoute from '../routes/ProtectedAdminRoute/ProtectedAdminRoute';
import { UserContext } from '../context';

const UserLayout = (props) => {
  const { userData } = useContext(UserContext);

  const renderSideNav = () => {
    if (userData.userType === "admin") {
      return <SideNav />;
    }
  }
  return (
    <>
      <Header />
      {renderSideNav()}
      <main className="main">
        <Routes>
          <Route exact path={`/user`} element={<HomePage />} />
          <Route exact path={`/user/clients`} element={<ClientsPage />} />
          <Route exact path={`/user/logs`} element={<WorkLogs />} />
          <Route 
            exact 
            path={`/admin/clients/add`} 
            element={
              <ProtectedAdminRoute>
                <AddClient />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/clients/remove`} 
            element={
              <ProtectedAdminRoute>
                <RemoveClient />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/clients/update`} 
            element={
              <ProtectedAdminRoute>
                <UpdateClient />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/clients/show`} 
            element={
              <ProtectedAdminRoute>
                <ShowClients />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/employees/add`} 
            element={
              <ProtectedAdminRoute>
                <AddEmployee />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/employees/remove`} 
            element={
              <ProtectedAdminRoute>
                <RemoveEmployee />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/employees/update`} 
            element={
              <ProtectedAdminRoute>
                <UpdateEmployee />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/employees/show`} 
            element={
              <ProtectedAdminRoute>
                <ShowEmployees />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </main>
    </>
  );
};

export default UserLayout;
