import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import './SideNav.scss';

const SideNav = () => {
  const [showClientOptions, setShowClientOptions] = useState(false);
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showUserOptions, setShowUsersOptions] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showInvoiceOptions, setShowInvoiceOptions] = useState(false);

  return (
    <div className={`sidenav-wrapper show ${showSideNav ? 'show' : ''}`} onMouseOver={() => setShowSideNav(true)} onMouseOut={() => setShowSideNav(false)}>
      <h3>Administrare</h3>
      <nav className="sidenav">
        <button className={`link-btn sidenav-dropdown-btn ${showClientOptions ? 'show' : ''}`} onClick={() => setShowClientOptions(!showClientOptions)}>
          Clienti
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Collapse in={showClientOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/clients/add">Adauga Client</Link>
            <Link to="/dashboard/admin/clients/remove">Sterge Client</Link>
            <Link to="/dashboard/admin/clients/update">Modifica Client</Link>
            <Link to="/dashboard/admin/clients/show">Lista Clienti</Link>
          </div>
        </Collapse>
        <button className={`link-btn sidenav-dropdown-btn ${showProjectOptions ? 'show' : ''}`} onClick={() => setShowProjectOptions(!showProjectOptions)}>
          Proiecte
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Collapse in={showProjectOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/projects/add">Adauga Proiect</Link>
            <Link to="/dashboard/admin/projects/remove">Sterge Proiect</Link>
            <Link to="/dashboard/admin/projects/update">Modifica Proiect</Link>
            <Link to="/dashboard/admin/projects/list">Lista Proiecte</Link>
            <Link to="/dashboard/admin/projects/assign">Proiecte Utilizatori</Link>
          </div>
        </Collapse>
        <button className={`link-btn sidenav-dropdown-btn ${showUserOptions ? 'show' : ''}`} onClick={() => setShowUsersOptions(!showUserOptions)}>
          Angajati
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Collapse in={showUserOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/users/add">Adauga Angajat</Link>
            <Link to="/dashboard/admin/users/remove">Sterge Angajat</Link>
            <Link to="/dashboard/admin/users/update">Modifica Angajat</Link>
            <Link to="/dashboard/admin/users/show">Lista Angajati</Link>
          </div>
        </Collapse>
        <button className={`link-btn sidenav-dropdown-btn ${showInvoiceOptions ? 'show' : ''}`} onClick={() => setShowInvoiceOptions(!showInvoiceOptions)}>
          Facturi
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Collapse in={showInvoiceOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/invoices/create">Creare Factura</Link>
            <Link to="/dashboard/admin/invoices/list">Lista facturi</Link>
          </div>
        </Collapse>
      </nav>
    </div>
  );
};

export default SideNav;
