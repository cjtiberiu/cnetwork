import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const ProjectDetails = (props) => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    getProjectDetails();
  }, [])

  const getProjectDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getprojectdetails?projectId=${projectId}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjectDetails(result.data);
    }
  }

  return projectDetails && (
    <Container>
      <h1>{projectDetails.name}</h1>
      <Row>
        <Col>
          <h3>Utlizatori Proiect</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nume</th>
                <th>Adresa Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>
                      <Link to={`/dashboard/admin/users/user/${user.id}`}>{user.email}</Link>
                    </td>
                    <td>{user.userRole}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button>Adauga Utilizator</Button>
        </Col>
        <Col lg={{ span: 4, offset: 1 }}>
          <div className="card p-3">
            <h3>Detalii Proiect</h3>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Client:</span>
                <span>{projectDetails.client.name}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Tara:</span>
                <span>{projectDetails.client.country.name}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Moneda:</span>
                <span>{projectDetails.client.country.currency}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Tip Proiect:</span>
                <span>{projectDetails.project_type.type}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default ProjectDetails;