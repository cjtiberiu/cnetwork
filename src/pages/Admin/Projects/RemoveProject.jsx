import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const RemoveProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    console.log(selectedProjectId);
  }, [selectedProjectId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/removeproject/${selectedProjectId}`, requestOptions);
    const result = await response.json();

    if (result.message) {
      setDisplayMessage(result.message);
    }

    getProjects();
  };

  return (
    <Container>
      <h1>Stergere Proiect</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3">
              <Form.Select className="mb-3" aria-label="Client" id="projects" name="projects" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
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
            <Button type="submit" variant="danger" className="w-100 mt-3">
              Sterge
            </Button>
          </Form>
          <p>{displayMessage}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveProject;
