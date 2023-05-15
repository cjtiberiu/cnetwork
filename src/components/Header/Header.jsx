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
          <Link to="/dashboard/user/clients" className="nav-item">
            Clienti
          </Link>
          <Link to="/dashboard/user/projects" className="nav-item">
            Proiecte
          </Link>
          <Link to="/dashboard/user/logs" className="nav-item">
            Ore Lucrate
          </Link>
          <Link to="/dashboard/user/users" className="nav-item">
            Echipa
          </Link>
        </nav>
        <nav className="utility-nav">
          <Button onClick={signOut}>
            Delogare
          </Button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
