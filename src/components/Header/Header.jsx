import { useContext } from 'react';
import { UserContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/logo.svg';
//import './Header.scss';

const Header = (props) => {
  const { userData, dispatchUserEvent } = useContext(UserContext)
  const navigate = useNavigate();

  const signOut = () => {
    dispatchUserEvent('REMOVE_USER');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="header">
      <Container>
        <Link to ="/dashboard">
          <div className="logo-wrapper">
            <Logo />
          </div>
        </Link>
        <nav className="nav">
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
        <nav className="utility-nav d-flex align-items-center">
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
      </Container>
    </header>
  );
};

export default Header;
