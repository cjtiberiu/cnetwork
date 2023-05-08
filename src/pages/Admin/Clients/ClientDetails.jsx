import { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const ClientDetails = (props) => {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState(null);

  useEffect(() => {
    getClientDetails();
  }, [])

  const getClientDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getclientdetails?clientId=${clientId}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setClientDetails(result.data);
    }
  }

  return clientDetails && (
    <Container>
      <h1>{clientDetails.name}</h1>
      <Row>
        <Col>
          <h3>Proiectele Clientului</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Proiect</th>
                <th>Tip Proiect</th>
              </tr>
            </thead>
            <tbody>
              {clientDetails.projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <td>
                      <Link to={`/dashboard/admin/projects/project/${project.id}`}>{project.name}</Link>
                    </td>
                    <td>{project.project_type.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h3>Detalii Client</h3>
          <ul className="list-unstyled">
            <li>Tara: {clientDetails.country.name}</li>
            <li>Moneda: {clientDetails.country.currency}</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
};

export default ClientDetails;