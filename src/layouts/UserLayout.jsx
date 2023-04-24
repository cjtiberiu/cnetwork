import { useState, useEffect } from 'react';
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

const UserLayout = (props) => {
  return (
    <>
      <Header />
      <SideNav />
      <main className="main">
        <Routes>
          <Route exact path={`/`} element={<HomePage />} />
          <Route exact path={`/clients`} element={<ClientsPage />} />
          <Route exact path={`/logs`} element={<WorkLogs />} />
          <Route exact path={`/admin/clients/add`} element={<AddClient />} />
          <Route exact path={`/admin/clients/remove`} element={<RemoveClient />} />
          <Route exact path={`/admin/clients/update`} element={<UpdateClient />} />
          <Route exact path={`/admin/clients/show`} element={<ShowClients />} />
          <Route exact path={`/admin/employees/add`} element={<AddEmployee />} />
          <Route exact path={`/admin/employees/remove`} element={<RemoveEmployee />} />
          <Route exact path={`/admin/employees/update`} element={<UpdateEmployee />} />
          <Route exact path={`/admin/employees/show`} element={<ShowEmployees />} />
        </Routes>
      </main>
    </>
  );
};

export default UserLayout;
