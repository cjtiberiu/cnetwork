import { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const UserDetails = (props) => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserdetails?userId=${userId}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setUserDetails(result.data);
    }
  }

  return userDetails && (
    <Container>
      <h1>{userDetails.email}</h1>
      <Row>
        <Col>
          <h3>Proiecte Utilizatori</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Proiect</th>
                <th>Tip Proiect</th>
                <th>Client</th>
                <th>Tara</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <td>
                      <Link to={`/dashboard/admin/projects/project/${project.id}`}>{project.name}</Link>
                    </td>
                    <td>{project.projectType}</td>
                    <td>
                      <Link to={`/dashboard/admin/clients/client/${project.client.id}`}>{project.client.name}</Link>
                    </td>
                    <td>{project.client.country.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col lg={{ span: 4, offset: 2 }}>
          <div className="card p-4">
            <h3>Detalii Proiect</h3>
            <ul className="list-unstyled">
              <li>Nume Utilizator: {userDetails.firstName} {userDetails.lastName}</li>
              <li>Email: {userDetails.email}</li>
              <li>Tip Utilizator: {userDetails.userRole}</li>
              <li>Functie Utilizator: {userDetails.userType}</li>
              <li>Data Inceput Contract: {userDetails.contractStartDate}</li>
              <li>Data Incetare Contract: {userDetails.contractEndDate}</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default UserDetails;