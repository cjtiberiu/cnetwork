import { useState, useEffect } from 'react';
import { Container, Table } from "react-bootstrap";

const ListInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, [])

  const getInvoices = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getinvoices`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setInvoices(result.data);
    }
  }

  return (
    <Container>
      <h1>Lista Facturi</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>TVA</th>
            <th>Valoare TVA</th>
            <th>Suma Totala</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client.name}</td>
                <td>{invoice.vatPercentage}</td>
                <td>{invoice.vatAmount}</td>
                <td>{invoice.totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  )
};

export default ListInvoices;