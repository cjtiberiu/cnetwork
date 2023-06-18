import { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner, Form } from 'react-bootstrap';
import { filterArray } from '../../../utils/utils';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    userRole: ''
  });
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  
  useEffect(() => {
    getTeamMembers();
    getUserRoles();
  }, []);

  useEffect(() => {
    const filteredResults = filterArray(members, filters);
    setFilteredMembers(filteredResults);
  }, [filters])

  const getTeamMembers = async () => {
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
      setMembers(result.users);
    }

    setLoading(false);
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

    if (result.userRoles) {
      setUserRoles(result.userRoles);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={2} className="px-2">
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
        <Col xs={2} className="px-2">
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
        </Col>
      </Row>
      <Row>
        {loading ? (
          <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          (Object.keys(filters).some(key => filters[key] !== '') ? filteredMembers : members).map((member) => {
            return (
            <Col className="p-2" xs={12} lg={3} key={member.id}>
              <div className="card p-3 d-flex flex-column align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#025464" className="fs-30" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
                <span className="mt-2"><strong>{member.firstName} {member.lastName}</strong></span>
                <span className="mt-1">{member.userRole}</span>
              </div>
            </Col>
            )
          })
        )}
      </Row>
    </Container>
  );
};

export default TeamMembers;
