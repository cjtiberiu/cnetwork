import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddClient = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    countryId: 0,
  })
  const [countries, setCountries] = useState([]);
  const [displayMessage, setDisplayMessage] = useState('');


  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisplayMessage('');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/addclient`, requestOptions);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <Container>
      <h1>Adauga Client</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Client</Form.Label>
              <Form.Control type="text" name="name" onChange={handleInputChange}></Form.Control>
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

export default AddClient;
