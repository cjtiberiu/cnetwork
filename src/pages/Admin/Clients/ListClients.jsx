import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const ShowEmployees = (props) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getclients`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setClients(result.data);
    }
  }

  return (
    <Container>
      <h1>Show Employees</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr>
                <td>{client.name}</td>
                <td>{client.country.name}</td>
                <td>{client.country.currency}</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShowEmployees;
