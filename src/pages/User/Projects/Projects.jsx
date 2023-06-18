import { useState, useEffect, useContext } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getProjects();
  }, []);

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

  return (
    <Container>
      <Row>
        {loading ? (
          <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          projects.map((project) => {
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
      </Row>
    </Container>
  );
};

export default Projects;
