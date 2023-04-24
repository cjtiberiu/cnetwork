import { useContext } from 'react';
import { UserContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
//import './Header.scss';

const Header = (props) => {
  const { dispatchUserEvent } = useContext(UserContext)
  const navigate = useNavigate();

  const signOut = () => {
    dispatchUserEvent('REMOVE_USER');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="header">
      <Container>
        <div className="logo-wrapper">
          <h3>LOGO</h3>
        </div>
        <nav className="nav">
          <Link to="/dashboard/clients" className="nav-item">
            Clients
          </Link>
          <Link to="/dashboard/projects" className="nav-item">
            Projects
          </Link>
          <Link to="/dashboard/logs" className="nav-item">
            Work Logs
          </Link>
          <Link to="/dashboard/employees" className="nav-item">
            Staff
          </Link>
        </nav>
        <nav className="utility-nav">
          <Button onClick={signOut}>
            Sign Out
          </Button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
