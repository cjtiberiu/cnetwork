import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import './Header.scss';

const Header = (props) => {
    const navigate = useNavigate();
    const { setUserData } = props;

    const signOut = () => {
        setUserData(null);
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/clients" className="nav-item">
                    Clients
                </Link>
                <Link to="/projects" className="nav-item">
                    Projects
                </Link>
                <Link to="/employees" className="nav-item">
                    Staff
                </Link>
                <button className="nav-item" onClick={signOut}>
                    Sign Out
                </button>
            </nav>
        </header>
    );
};

export default Header;