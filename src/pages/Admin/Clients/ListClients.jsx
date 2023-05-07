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
      <h1>Lista Clienti</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Tara</th>
            <th>Moneda</th>
            <th>Numarul Proiectelor</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr key={client.id}>
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
