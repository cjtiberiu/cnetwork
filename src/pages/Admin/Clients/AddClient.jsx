import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ClientSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Trebuie sa existe cel putin 3 caractere!')
    .max(100, 'Numarul maxim de caractere a fost atins (100)')
    .required('Aces camp este necesar!'),
  countryId: Yup.number()
    .required('Trebuie selectata tara clientului')
    .moreThan(0, 'Clientul trebuie sa apartina de o tara!')
});

const AddClient = (props) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      countryId: 0,
    },
    validationSchema: ClientSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [countries, setCountries] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = async (values) => {
    setSuccessMessage('');
    setServerErrors([]);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addclient`, requestOptions);
      const result = await response.json();

      if (response.status === 200) {
        setServerErrors([]);
        formik.resetForm();
        if (result.message) {
          setSuccessMessage(result.message);
        }
      } else if (response.status === 400 && result.errors) {
        setServerErrors(result.errors)
      }
    } catch(err) {
      console.log(err)
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

  return (
    <Container>
      <h1>Adauga Client</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Client</Form.Label>
              <Form.Control type="text" name="name" value={formik.values.name} isInvalid={formik.touched.name && formik.errors.name} onChange={formik.handleChange}></Form.Control>
              {formik.touched.name && formik.errors.name && (
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="countryId">Tara</Form.Label>
              <Form.Select aria-label="Country" id="countryId" name="countryId" isInvalid={formik.touched.countryId && formik.errors.countryId} value={formik.values.countryId} onChange={formik.handleChange}>
                <option value="0">Alege o Tara</option>
                {countries.map((country) => {
                  return (
                    <option value={country.id} key={country.id}>
                      {country.name}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.touched.countryId && formik.errors.countryId && (
                <Form.Control.Feedback type="invalid">{formik.errors.countryId}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Adauga
            </Button>
          </Form>
          {successMessage && (
            <Alert variant="success" className="mt-3">
              {successMessage}
            </Alert>
          )}
          {serverErrors.length > 0 && (
            <Alert variant="danger" className="mt-3">
              <ul className="list-unstyled mb-0">
                {serverErrors.map(error => {
                    return <li key={error.message}>* {error.message}</li>
                })}
              </ul>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddClient;
