import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Trebuie sa existe cel putin 3 caractere!')
    .max(100, 'Numarul maxim de caractere a fost atins (100)')
    .required('Aces camp este necesar!'),
  clientId: Yup.number()
    .required('Trebuie selectat clientul')
    .moreThan(0, 'Proiectul trebuie alocat unui client'),
  projectType: Yup.number()
    .required('Trebuie selectat tipul proiectului')
    .moreThan(0, 'Trebuie selectat tipul proiectului')
});

const AddProject = (props) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      clientId: 0,
      projectType: 0,
    },
    validationSchema: ProjectSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [clients, setClients] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    getClients();
    getProjectTypes();
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addproject`, requestOptions);
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
  };

  const getProjectTypes = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getprojecttypes`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjectTypes(result.data);
    }
  }

  return (
    <Container>
      <h1>Adauga Proiect</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Titlu</Form.Label>
              <Form.Control type="text" name="name" value={formik.values.name} isInvalid={formik.touched.name && formik.errors.name} onChange={formik.handleChange}></Form.Control>
              {formik.touched.name && formik.errors.name && (
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="clientId">Client</Form.Label>
              <Form.Select aria-label="Client" id="clientId" name="clientId" isInvalid={formik.touched.clientId && formik.errors.clientId} value={formik.values.clientId} onChange={formik.handleChange}>
                <option value="0">Alege un Client</option>
                {clients.map((client) => {
                  return (
                    <option value={client.id} key={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.touched.clientId && formik.errors.clientId && (
                <Form.Control.Feedback type="invalid">{formik.errors.clientId}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="projectType">Tipul Proiectului</Form.Label>
              <Form.Select aria-label="Project Type" id="projectType" name="projectType" isInvalid={formik.touched.projectType && formik.errors.projectType} value={formik.values.projectType} onChange={formik.handleChange}>
                <option value="0">Alege Tipul Proiectului</option>
                {projectTypes.map((type) => {
                  return (
                    <option value={type.id} key={type.id}>
                      {type.type}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.touched.projectType && formik.errors.projectType && (
                <Form.Control.Feedback type="invalid">{formik.errors.projectType}</Form.Control.Feedback>
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

export default AddProject;
