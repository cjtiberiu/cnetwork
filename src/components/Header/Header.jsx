import { useContext } from 'react';
import { UserContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
//import './Header.scss';

const Header = (props) => {
    const { dispatchUserEvent} = useContext(UserContext)
    const navigate = useNavigate();

    const signOut = () => {
        dispatchUserEvent('REMOVE_USER');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/dashboard/clients" className="nav-item">
                    Clients
                </Link>
                <Link to="/dashboard/projects" className="nav-item">
                    Projects
                </Link>
                <Link to="/dashboard/employees" className="nav-item">
                    Staff
                </Link>
                <button className="nav-item link-btn" onClick={signOut}>
                    Sign Out
                </button>
            </nav>
        </header>
    );
};

export default Header;
