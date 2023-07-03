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
import ListClients from '../pages/Admin/Clients/ListClients';
import AddProject from '../pages/Admin/Projects/AddProject';
import RemoveProject from '../pages/Admin/Projects/RemoveProject';
import UpdateProject from '../pages/Admin/Projects/UpdateProject';
import ListProjects from '../pages/Admin/Projects/ListProjects';
import UsersProjects from '../pages/Admin/Projects/UsersProjects';
import AddUser from '../pages/Admin/Users/AddUser';
import RemoveUser from '../pages/Admin/Users/RemoveUser';
import UpdateUser from '../pages/Admin/Users/UpdateUser';
import ListUsers from '../pages/Admin/Users/ListUsers';
import ProtectedUserRoute from '../routes/ProtectedUserRoute/ProtectedUserRoute';
import ProtectedAdminRoute from '../routes/ProtectedAdminRoute/ProtectedAdminRoute';
import { UserContext } from '../context';
import ProjectDetails from '../pages/Admin/Projects/ProjectDetails';
import ClientDetails from '../pages/Admin/Clients/ClientDetails';
import UserDetails from '../pages/Admin/Users/UserDetails';
import ListInvoices from '../pages/Admin/Invoices/ListInvoices';
import CreateInvoice from '../pages/Admin/Invoices/CreateInvoice';
import InvoiceDetails from '../pages/Admin/Invoices/InvoiceDetails';
import Projects from '../pages/User/Projects/Projects';
import TeamMembers from '../pages/User/TeamMembers/TeamMembers';

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
          <Route exact path={`/`} element={<HomePage />} />
          <Route exact path={`/user/projects`} element={<Projects />} />
          <Route exact path={`/user/logs`} element={<WorkLogs />} />
          <Route 
            exact 
            path={`/projects/project/:projectId`} 
            element={
              <ProtectedUserRoute>
                <ProjectDetails />
              </ProtectedUserRoute>
            } 
          />
          <Route 
            exact 
            path={`/team/members`} 
            element={
              <ProtectedUserRoute>
                <TeamMembers />
              </ProtectedUserRoute>
            } 
          />
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
                <ListClients />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/clients/client/:clientId`} 
            element={
              <ProtectedAdminRoute>
                <ClientDetails />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/users/add`} 
            element={
              <ProtectedAdminRoute>
                <AddUser />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/users/remove`} 
            element={
              <ProtectedAdminRoute>
                <RemoveUser />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/users/update`} 
            element={
              <ProtectedAdminRoute>
                <UpdateUser />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/users/show`} 
            element={
              <ProtectedAdminRoute>
                <ListUsers />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/users/user/:userId`} 
            element={
              <ProtectedAdminRoute>
                <UserDetails />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/add`} 
            element={
              <ProtectedAdminRoute>
                <AddProject />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/remove`} 
            element={
              <ProtectedAdminRoute>
                <RemoveProject />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/update`} 
            element={
              <ProtectedAdminRoute>
                <UpdateProject />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/list`} 
            element={
              <ProtectedAdminRoute>
                <ListProjects />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/assign`} 
            element={
              <ProtectedAdminRoute>
                <UsersProjects />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/projects/project/:projectId`} 
            element={
              <ProtectedAdminRoute>
                <ProjectDetails />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/invoices/list`} 
            element={
              <ProtectedAdminRoute>
                <ListInvoices />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/invoices/create`} 
            element={
              <ProtectedAdminRoute>
                <CreateInvoice />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            exact 
            path={`/admin/invoices/invoice/:invoiceId`} 
            element={
              <ProtectedAdminRoute>
                <InvoiceDetails />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </main>
    </>
  );
};

export default UserLayout;
