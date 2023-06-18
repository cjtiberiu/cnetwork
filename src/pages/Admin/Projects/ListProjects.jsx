import { useState, useEffect } from 'react';
import { Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { filterArray } from '../../../utils/utils';

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    projectType: ''
  });
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);

  useEffect(() => {
    getProjects();
    getProjectTypes();
  }, []);

  useEffect(() => {
    const filteredResults = filterArray(projects, filters);
    setFilteredProjects(filteredResults);
  }, [filters])

  const getProjects = async () => {
    setLoading(true);

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

    setLoading(false);
  }

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

  return (
    <Container>
      <h1>Lista Proiecte</h1>
      <Row>
        <Col xs={2}>
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
              aria-label="type" 
              id="type" 
              name="type" 
              value={filters.projectType} 
              onChange={(e) => setFilters({ ...filters, projectType: e.target.value })}
            >
              <option value="">Alege Tipul</option>
              {projectTypes.map((type) => {
                return (
                  <option value={type.type} key={type.id}>
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
                <th>Client</th>
                <th>Tip</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(filters).some(key => filters[key] !== '') ? filteredProjects : projects).map((project) => {
                return (
                  <tr key={project.id}>
                    <td>
                      <Link to={`/dashboard/admin/projects/project/${project.id}`}>{project.name}</Link>
                    </td>
                    <td>{project.client.name}</td>
                    <td>{project.project_type.type}</td>
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

export default ListProjects;
