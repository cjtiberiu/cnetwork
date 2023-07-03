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
        <Col lg={{ span: 4, offset: 1 }}>
          <div className="card p-3">
            <h3>Detalii Client</h3>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Tara:</span>
                <span>{clientDetails.country.name}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom py-1">
                <span>Moneda:</span>
                <span>{clientDetails.country.currency}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default ClientDetails;