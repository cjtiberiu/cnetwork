import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    clientId: 0,
    projectType: 1
  })
  const [clients, setClients] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [displayMessage, setDisplayMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

  useEffect(() => {
    getProjects();
    getClients();
    getProjectTypes();
  }, []);

  useEffect(() => {
    const selectedProject = projects.find(project => project.id == selectedProjectId);

    if (selectedProject) {
      setFormData({
        name: selectedProject.name,
        clientId: selectedProject.client.id,
        projectType: selectedProject.project_type.id,
      })
    }
  }, [selectedProjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/updateproject/${selectedProjectId}`, requestOptions);
    const result = await response.json();

    if (result.message) {
      setDisplayMessage(result.message);
    }
  };

  // TODO: rethink getUserTypes and getUserRoles to follow DRY principle
  // try to reduce the number of requests by storing the data on app init

  const getClients = async () => {
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
  };

  const getProjectTypes = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getprojecttypes`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjectTypes(result.data);
    }
  }

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
      setProjects(result.data);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <Container>
      <h1>Modifica Proiect</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form.Group className="mb-3 mt-3 pb-3 border-bottom">
            <Form.Select className="mb-3" aria-label="Projects" id="projects" name="projects" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
              <option value="0">Alege Proiect</option>
              {projects.map((project) => {
                return (
                  <option value={project.id} key={project.id}>
                    {project.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Titlu</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="clientId">Client</Form.Label>
              <Form.Select aria-label="Client" id="clientId" name="clientId" value={formData.clientId} onChange={handleInputChange}>
                <option value="0">Alege un Client</option>
                {clients.map((client) => {
                  return (
                    <option value={client.id} key={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="projectType">Tipul Proiectului</Form.Label>
              <Form.Select aria-label="Project Type" id="projectType" name="projectType" value={formData.projectType} onChange={handleInputChange}>
                {projectTypes.map((type) => {
                  return (
                    <option value={type.id} key={type.id}>
                      {type.type}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Adauga
            </Button>
          </Form>
          <p>{displayMessage}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProject;
