import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

const SideNav = () => {
    const [showClientOptions, setShowClientOptions] = useState(false);
    const [showProjectOptions, setShowProjectOptions] = useState(false);
    const [showEmployeesOptions, setShowEmployeesOptions] = useState(false);

    return (
        <div className="sidenav-wrapper">
            <nav className="sidenav">
                <Link to="/dashboard">Home</Link>
                <button className="link-btn" onClick={() => setShowClientOptions(!showClientOptions)}>
                    Clients
                </button>
                <Collapse in={showClientOptions}>
                    <div className="collapse-nav">
                        <Link to="/admin/clients/add">Add Client</Link>
                        <Link to="/admin/clients/remove">Remove Client</Link>
                        <Link to="/admin/clients/update">Update Client</Link>
                        <Link to="/admin/clients/show">Show Clients</Link>
                    </div>
                </Collapse>
                <button className="link-btn" onClick={() => setShowProjectOptions(!showProjectOptions)}>
                    Projects
                </button>
                <Collapse in={showProjectOptions}>
                    <div className="collapse-nav">
                        <Link to="/admin/projects/add">Add Project</Link>
                        <Link to="/admin/projects/remove">Remove Project</Link>
                        <Link to="/admin/projects/update">Update Project</Link>
                        <Link to="/admin/projects/show">Show Projects</Link>
                    </div>
                </Collapse>
                <button className="link-btn" onClick={() => setShowEmployeesOptions(!showEmployeesOptions)}>
                    Employees
                </button>
                <Collapse in={showEmployeesOptions}>
                    <div className="collapse-nav">
                        <Link to="/admin/employees/add">Add Employee</Link>
                        <Link to="/admin/employees/remove">Remove Employee</Link>
                        <Link to="/admin/employees/update">Update Employee</Link>
                        <Link to="/admin/employees/show">Show Employees</Link>
                    </div>
                </Collapse>
            </nav>
        </div>
    );
};

export default SideNav;
