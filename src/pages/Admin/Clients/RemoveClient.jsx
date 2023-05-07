import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const RemoveClient = (props) => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(0);
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log(selectedClientId);
  }, [selectedClientId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/removeclient/${selectedClientId}`, requestOptions);
    const result = await response.json();

    if (result.message) {
      setDisplayMessage(result.message);
    }

    getClients();
  };

  return (
    <Container>
      <h1>Stergere Client</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3">
              <Form.Select className="mb-3" aria-label="Client" id="clients" name="clients" value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)}>
                <option value="0">Client</option>
                {clients.map((client) => {
                  return (
                    <option value={client.id} key={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="danger" className="w-100 mt-3">
              Sterge
            </Button>
          </Form>
          <p>{displayMessage}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default RemoveClient;
