import { useState, useEffect, useContext } from 'react';
import { Col, Container, Row, Spinner, Form } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context';
import { filterArray } from '../../../utils/utils';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { userData } = useContext(UserContext);
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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserdetails?userId=${userData.id}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjects(result.data.projects);
    }

    setLoading(false);
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
        {projects.length === 0 ? (
          <p>Nu exista proiecte asignate</p>
        ) : loading ? (
          <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          (Object.keys(filters).some(key => filters[key] !== '') ? filteredProjects : projects).map((project) => {
            return (
              <Col className="p-2" xs={12} lg={3} key={project.id}>
                <Link to={`/dashboard/projects/project/${project.id}`} className="card p-3 d-flex flex-column align-items-center justify-content-center">
                  <Logo style={{ width: 50, height: 50 }} />
                  <span className="mt-2">{project.name}</span>
                </Link>
              </Col>
            )
          })
        )}
        {Object.keys(filters).some(key => filters[key] !== '') && filteredProjects.length === 0 && (
          <p>Nu exista proiecte care sa corespunda filtrelor selectate!</p>
        )}
      </Row>
    </Container>
  );
};

export default Projects;
