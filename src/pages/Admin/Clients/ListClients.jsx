import { useState, useEffect } from 'react';
import { Col, Container, Row, Table, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { filterArray } from '../../../utils/functions';

const ListUsers = (props) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    //country: ''
  });
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    const filteredResults = filterArray(clients, filters);
    setFilteredClients(filteredResults);
  }, [filters])

  const getClients = async () => {
    setLoading(true);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getclients`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setClients(result.data);
    }

    setLoading(false);
  }

  return (
    <Container>
      <h1>Lista Clienti</h1>
      <Row>
        <Col xs={6} lg={2}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="visually-hidden">Cautare dupa nume</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Cautare dupa nume"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        {/* <Col xs={2} className="px-2">
          <Form.Group className="mb-3">
            <Form.Select 
              aria-label="role" 
              id="role" 
              name="role" 
              value={filters.userRole} 
              onChange={(e) => setFilters({ ...filters, userRole: e.target.value })}
            >
              <option value="">Alege Rolul</option>
              {userRoles.map((role) => {
                return (
                  <option value={role.role} key={role.id}>
                    {role.role}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col> */}
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
                  <th>Tara</th>
                  <th>Moneda</th>
                  <th className="text-center">Numarul Proiectelor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(filters).some(key => filters[key] !== '') ? filteredClients : clients).map((client) => {
                  return (
                    <tr key={client.id}>
                      <td>
                        <Link to={`/dashboard/admin/clients/client/${client.id}`}>{client.name}</Link>
                      </td>
                      <td>{client.country.name}</td>
                      <td>{client.country.currency}</td>
                      <td className="text-center">{client.projects.length}</td>
                      <td className="text-center">
                        <Link to={`/dashboard/admin/clients/client/${client.id}`} className="text-primary">Detalii</Link>
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
