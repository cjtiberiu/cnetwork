import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import './SideNav.scss';

const SideNav = () => {
  const [showClientOptions, setShowClientOptions] = useState(false);
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [ListUsersOptions, setListUsersOptions] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className={`sidenav-wrapper ${showSideNav ? 'show' : ''}`} onMouseOver={() => setShowSideNav(true)} onMouseOut={() => setShowSideNav(false)}>
      <h3>Panou Administrare</h3>
      <nav className="sidenav">
        <Link to="/dashboard">Home</Link>
        <button className="link-btn" onClick={() => setShowClientOptions(!showClientOptions)}>
          Clienti
        </button>
        <Collapse in={showClientOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/clients/add">Adauga Client</Link>
            <Link to="/dashboard/admin/clients/remove">Sterge Client</Link>
            <Link to="/dashboard/admin/clients/update">Modifica Client</Link>
            <Link to="/dashboard/admin/clients/show">Lista Clienti</Link>
          </div>
        </Collapse>
        <button className="link-btn" onClick={() => setShowProjectOptions(!showProjectOptions)}>
          Proiecte
        </button>
        <Collapse in={showProjectOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/projects/add">Adauga Project</Link>
            <Link to="/dashboard/admin/projects/remove">Sterge Project</Link>
            <Link to="/dashboard/admin/projects/update">Modifica Project</Link>
            <Link to="/dashboard/admin/projects/list">Lista Proiecte</Link>
            <Link to="/dashboard/admin/projects/assign">Proiecte Utilizatori</Link>
          </div>
        </Collapse>
        <button className="link-btn" onClick={() => setListUsersOptions(!ListUsersOptions)}>
          Angajati
        </button>
        <Collapse in={ListUsersOptions}>
          <div className="collapse-nav">
            <Link to="/dashboard/admin/users/add">Adauga Angajat</Link>
            <Link to="/dashboard/admin/users/remove">Sterge Angajat</Link>
            <Link to="/dashboard/admin/users/update">Modifica Angajat</Link>
            <Link to="/dashboard/admin/users/show">Lista Angajati</Link>
          </div>
        </Collapse>
      </nav>
      {/* <Button className="sidenav-toggle">Open Admin Panel</Button> */}
    </div>
  );
};

export default SideNav;
