import { useState, useEffect } from 'react';
import { Container, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>TVA</th>
            <th>Valoare TVA</th>
            <th>Suma Totala</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client.name}</td>
                <td>{invoice.vatPercentage}</td>
                <td>{invoice.vatAmount} {invoice.client.country.currency}</td>
                <td>{invoice.totalAmount} {invoice.client.country.currency}</td>
                <td className="d-flex justify-content-center">
                  <Link to={`/dashboard/admin/invoices/invoice/${invoice.id}`}>Detalii</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  )
};

export default ListInvoices;