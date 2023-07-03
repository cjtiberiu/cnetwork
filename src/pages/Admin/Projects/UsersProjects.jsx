import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

const UsersProjects = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedUserProjects, setSelectedUserProjects] = useState(null);
  const [pricePerHour, setPricePerHour] = useState(0);
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    getUsers();
    getProjects();
  }, [])

  useEffect(() => {
    if (selectedUserId) {
      getUserProjects();
    }
  }, [selectedUserId])

  const getUsers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusers`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setUsers(result.data);
    }
  };

  const getProjects = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getprojects`, requestOptions);
    const result = await response.json();

    if (result.data) {
      console.log(result.data)
      setProjects(result.data);
    }
  }

  const getUserProjects = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserdetails?userId=${selectedUserId}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setSelectedUserProjects(result.data.projects);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify({ userId: selectedUserId, projectId: selectedProjectId, pricePerHour: pricePerHour }),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/addusertoproject`, requestOptions);
    const result = await response.json();

    if (result.message) {
      setDisplayMessage(result.message);
    }

    if (response.status == 200) {
      getUserProjects();
    }
  }

  const removeUserFromProject = async (userId, projectId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/removeuserfromproject/${userId}/${projectId}`, requestOptions);
    const result = await response.json();

    if (response.status == 200) {
      getUserProjects();
    }
  }

  return (
    <Container>
      <h1>Asignare Proiect la Utilizator</h1>
      <Row>
        <Col xs={{ span: 12 }} lg={{ span: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3 pb-2 border-bottom">
              <Form.Select className="mb-3" aria-label="Users" id="users" name="users" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="0">Alege utilizator</option>
                {users.map((user) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {`${user.firstName} ${user.lastName} (${user.email})`}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 mt-3 pt-2">
              <Form.Select className="mb-3" aria-label="Projects" id="projects" name="projects" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                <option value="0">Alege Proiect</option>
                {projects.map((project) => {
                  return (
                    <option value={project.id} key={project.id}>
                      {project.name} - {project.client.country.currency}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 pb-3">
              <Form.Label htmlFor="pricePerHour">Pret per ora</Form.Label>
              <Form.Control type="number" name="pricePerHour" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)}></Form.Control>
            </Form.Group>
            <Button onClick={handleSubmit} type="submit">Adauga</Button>
          </Form>
          <p>{displayMessage}</p>
        </Col>
        {selectedUserProjects && (
          <Col lg={{ span: 5, offset: 3 }}>
            <h4>Lista proiectelor utilizatorului selectat</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Proiect</th>
                  <th>Client</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedUserProjects.map((project) => {
                  return (
                    <tr key={project.id} className="align-middle">
                      <td>{project.name}</td>
                      <td>{project.client.name}</td>
                      <td className="d-flex justify-content-center">
                        <Button variant="danger" onClick={() => removeUserFromProject(selectedUserId, project.id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
    </Container>
  )
};

export default UsersProjects;