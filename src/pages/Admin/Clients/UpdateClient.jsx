import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateClient = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    countryId: 0,
  })
  const [countries, setCountries] = useState([]);
  const [displayMessage, setDisplayMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(0);

  useEffect(() => {
    getClients();
    getCountries();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (selectedClient) {
      const selectedClientObj = clients.find(client => client.id == selectedClient);
      console.log(selectedClientObj)

      setFormData({
        name: selectedClientObj.name,
        countryId: selectedClientObj.country.id
      })
    }
  }, [selectedClient])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/updateclient/${selectedClient}`, requestOptions);
    const result = await response.json();

    if (result.message) {
      setDisplayMessage(result.message);
    }
  };

  // TODO: rethink getUserTypes and getUserRoles to follow DRY principle
  // try to reduce the number of requests by storing the data on app init

  const getCountries = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getcountries`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setCountries(result.data);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <Container>
      <h1>Modifica Client</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form.Group className="mb-3 mt-3 pb-3 border-bottom">
            <Form.Select className="mb-3" aria-label="Clients" id="clients" name="clients" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              <option value="0">Selecteaza Client</option>
              {clients.map((client) => {
                return (
                  <option value={client.id} key={client.id}>
                    {client.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Client</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="countryId">Tara</Form.Label>
              <Form.Select aria-label="Country" id="countryId" name="countryId" value={formData.countryId} onChange={handleInputChange}>
                <option value="0">Alege o Tara</option>
                {countries.map((country) => {
                  return (
                    <option value={country.id} key={country.id}>
                      {country.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Adauga
            </Button>
          </Form>
          <p>{displayMessage}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateClient;
