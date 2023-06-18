import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListUsers = (props) => {
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
            <th className="text-center">Numarul Proiectelor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr key={client.id}>
                <td>
                  <Link to={`/dashboard/admin/clients/client/${client.id}`}>{client.name}</Link>
                </td>
                <td>{client.country.name}</td>
                <td>{client.country.currency}</td>
                <td className="text-center">{client.projects.length}</td>
                <td className="text-center">
                  <Link to={`/dashboard/admin/clients/client/${client.id}`} className="text-primary">Detalii</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListUsers;
