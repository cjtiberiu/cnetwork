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

  const formatDate = (dateToFormat) => {
    let date = new Date(dateToFormat);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
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
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Nume Utilizator:</span>
                <span>{userDetails.firstName} {userDetails.lastName}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Email:</span>
                <span>{userDetails.email}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Tip Utilizator:</span>
                <span>{userDetails.userType}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Functie Utilizator:</span>
                <span>{userDetails.userRole}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Data Inceput Contract:</span>
                <span>{userDetails.contractStartDate ? formatDate(userDetails.contractStartDate) : '-'}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Data Incetare Contract:</span>
                <span>{userDetails.contractEndDate ? formatDate(userDetails.contractEndDate) : '-'}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default UserDetails;