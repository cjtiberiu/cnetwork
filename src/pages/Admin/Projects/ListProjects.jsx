import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

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

  return (
    <Container>
      <h1>Lista Proiecte</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Client</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
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
    </Container>
  );
};

export default ListProjects;
