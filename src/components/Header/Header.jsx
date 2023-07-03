import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/logo.svg';
//import './Header.scss';

const Header = (props) => {
  const { userData, dispatchUserEvent } = useContext(UserContext)
  const navigate = useNavigate();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const signOut = () => {
    dispatchUserEvent('REMOVE_USER');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="header">
      <Container className="py-2 px-lg-none">
        <Link to ="/dashboard">
          <div className="logo-wrapper">
            <Logo />
          </div>
        </Link>
        <nav className={`mobile-nav ${showMobileNav ? 'd-flex' : 'd-none'} d-lg-none`}>
          <Link to="/dashboard/user/projects" className="nav-item" onClick={() => setShowMobileNav(false)}>
            Proiectele Mele
          </Link>
          <Link to="/dashboard/user/logs" className="nav-item" onClick={() => setShowMobileNav(false)}>
            Ore Lucrate
          </Link>
          <Link to="/dashboard/team/members" className="nav-item" onClick={() => setShowMobileNav(false)}>
            Echipa
          </Link>
          <Button onClick={signOut}>
            Delogare
          </Button>
        </nav>
        <nav className="nav d-none d-lg-flex">
          <Link to="/dashboard/user/projects" className="nav-item">
            Proiectele Mele
          </Link>
          <Link to="/dashboard/user/logs" className="nav-item">
            Ore Lucrate
          </Link>
          <Link to="/dashboard/team/members" className="nav-item">
            Echipa
          </Link>
        </nav>
        <nav className="utility-nav d-none d-lg-flex align-items-center">
          <div className="d-flex align-items-center me-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#025464" className="me-1" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg>
            <span>{userData.email}</span>
          </div>
          <Button onClick={signOut}>
            Delogare
          </Button>
        </nav>
        <Button className="ms-auto d-block d-lg-none" onClick={() => setShowMobileNav(!showMobileNav)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </Button>
      </Container>
    </header>
  );
};

export default Header;
