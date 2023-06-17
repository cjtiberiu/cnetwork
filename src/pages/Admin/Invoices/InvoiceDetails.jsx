import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../../utils/utils";
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceTemplateRef = useRef(null);

  useEffect(() => {
    getInvoiceData();
  }, [])

  const getInvoiceData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/invoices/get/${invoiceId}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      console.log(result.data)
      setInvoiceData(result.data);
    }
  }

  const generatePdf = async () => {
    const invoiceTemplate = invoiceTemplateRef.current; // Reference to the invoice template div
    const options = {
      margin: [10, 10, 10, 10],
      filename: `invoice_${invoiceData.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf().set(options).from(invoiceTemplate).save();
  }

  return (
    <Container>
      <h1>Detalii Factura</h1>
      {invoiceData && (
        <Row>
          <Col>
            <div className="card p-4">
              <div ref={invoiceTemplateRef}>
                <h3>Factura #{invoiceData.id}</h3>
                <Row>
                  <Col lg={{ span: 8 }}>
                    <ul className="list-unstyled">
                      <li>{COMPANY_DATA.name}</li>
                      <li>CIF: {COMPANY_DATA.cif}</li>
                      <li>Adresa: {COMPANY_DATA.address}</li>
                      <li>Telefon: {COMPANY_DATA.tel}</li>
                    </ul>
                  </Col>
                  <Col>
                    <ul className="list-unstyled text-end">
                      <li>Client: {invoiceData.client.name}</li>
                      <li>CIF: 1xxxxxx</li>
                      <li>Adresa: Strada Tech nr.7</li>
                      {/* <li>Proect TVA: {invoiceData.vatPercentage}</li>
                      <li>Suma TVA: {invoiceData.vatAmount}</li>
                      <li>Total: {invoiceData.totalAmount}</li> */}
                    </ul>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Proiect</th>
                      <th>Utilizator</th>
                      <th>Pret/ora</th>
                      <th>Ore</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.entries.map((entry, index) => {
                      return (
                        <tr key={entry.id}>
                          <td>{index + 1}</td>
                          <td>{entry.project.name}</td>
                          <td>{entry.user.firstName} {entry.user.lastName}</td>
                          <td>{entry.pricePerHour}</td>
                          <td>{entry.totalHours}</td>
                          <td>{entry.pricePerHour * entry.totalHours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Row className="mt-3">
                  <Col lg={{ span: 4, offset: 8 }}>
                    <ul className="list-unstyled text-end">
                      <li><strong>Procent TVA: </strong>{invoiceData.vatPercentage}%</li>
                      <li><strong>Suma TVA: </strong>{invoiceData.vatAmount} {invoiceData.client.country.currency}</li>
                      <li className="fs-24"><strong>Total: {invoiceData.totalAmount} {invoiceData.client.country.currency}</strong></li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="text-end">
          <Button className="mt-3 ms-auto" onClick={generatePdf}>Descarca PDF</Button>
        </Col>
      </Row>
    </Container>
  )
};

export default InvoiceDetails;