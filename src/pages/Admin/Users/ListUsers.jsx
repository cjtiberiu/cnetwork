import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Table, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { filterArray } from '../../../utils/utils';

const ListUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    email: '',
    userType: '',
    userRole: ''
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    getUsers();
    getUserTypes();
    getUserRoles();
  }, []);

  useEffect(() => {
    const filteredResults = filterArray(users, filters);
    setFilteredUsers(filteredResults);
  }, [filters])

  const getUsers = async () => {
    setLoading(true);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusers`, requestOptions);
    const result = await response.json();

    if (result.users) {
      setUsers(result.users);
    }

    setLoading(false);
  };

  const getUserTypes = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusertypes`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setUserTypes(result.data);
    }
  };

  const getUserRoles = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserroles`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setUserRoles(result.data);
    }
  };

  return (
    <Container>
      <h1>Show users</h1>
      <Row>
        <Col xs={2}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="visually-hidden">Cautare dupa nume/email</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Cautare dupa email"
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col xs={2} className="px-2">
          <Form.Group className="mb-3">
            <Form.Select 
              aria-label="type" 
              id="type" 
              name="type" 
              value={filters.userRole} 
              onChange={(e) => setFilters({ ...filters, userRole: e.target.value })}
            >
              <option value="">Rol</option>
              {userRoles.map((role) => {
                return (
                  <option value={role.role} key={role.id} style={{ textTransform: 'capitalize' }}>
                    {role.role}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={2} className="px-2">
          <Form.Group className="mb-3">
            <Form.Select 
              aria-label="type" 
              id="type" 
              name="type" 
              value={filters.userType} 
              onChange={(e) => setFilters({ ...filters, userType: e.target.value })}
            >
              <option value="">Tip</option>
              {userTypes.map((type) => {
                return (
                  <option value={type.type} key={type.id} style={{ textTransform: 'capitalize' }}>
                    {type.type}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
        {loading ? (
          <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Tip Utilizator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(filters).some(key => filters[key] !== '') ? filteredUsers : users).map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.userRole}</td>
                    <td style={{ textTransform: 'capitalize' }}>{user.userType}</td>
                    <td className="text-center">
                      <Link to={`/dashboard/admin/users/user/${user.id}`} className="text-primary">Detalii</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListUsers;