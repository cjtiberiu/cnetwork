import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trebuie sa existe cel putin 2 caractere!')
    .max(50, 'Numarul maxim de caractere a fost atins (50)')
    .required('Aces camp este necesar!'),
  lastName: Yup.string()
    .min(2, 'Trebuie sa existe cel putin 2 caractere!')
    .max(50, 'Numarul maxim de caractere a fost atins (50)')
    .required('Aces camp este necesar!'),
  email: Yup.string()
    .email('Adresa de email nu este valida')
    .required('Aces camp este necesar!'),
  userRole: Yup.number()
    .required('Trebuie selectat rolul utilizatorului')
    .moreThan(0, 'Trebuie selectat rolul utilizatorului'),
  userType: Yup.number()
    .required('Trebuie selectat tipul utilizatorului')
    .moreThan(0, 'Trebuie selectat tipul utilizatorului')
});

const AddUser = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contractStartDate: null,
      contractEndDate: null,
      userRole: 0,
      userType: 0
    },
    validationSchema: UserSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [userTypes, setUserTypes] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    getUserTypes();
    getUserRoles();
  }, []);

  const handleSubmit = async (formikValues) => {
    setSuccessMessage('');
    setServerErrors([]);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(formikValues),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, requestOptions);
      const result = await response.json();

      console.log('response', response);
      console.log('result', result)
  
      if (response.status === 200) {
        setServerErrors([]);
        formik.resetForm();
        if (result.message) {
          setSuccessMessage(result.message);
        }
      } else if (response.status === 400 && result.errors) {
        console.log('here')
        setServerErrors(result.errors)
      }
    } catch(err) {
      console.log(err)
    }

  };

  // TODO: rethink getUserTypes and getUserRoles to follow DRY principle
  // try to reduce the number of requests by storing the data on app init

  const getUserTypes = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusertypes`, requestOptions);
    const result = await response.json();

    if (result.userTypes) {
      setUserTypes(result.userTypes);
    }
  };

  const getUserRoles = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserroles`, requestOptions);
    const result = await response.json();

    if (result.userRoles) {
      setUserRoles(result.userRoles);
    }
  };

  const setTouched = (e) => {
    formik.setTouched({
      ...formik.touched,
      [e.target.name]: true
    })
  }

  return (
    <Container>
      <h1>ADAUGA ANGAJAT</h1>
      <Row>
        <Col lg={{ span: 4 }}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="lastName">Nume</Form.Label>
              <Form.Control 
                type="text" 
                name="lastName" 
                onBlur={setTouched} 
                value={formik.values.lastName} 
                isInvalid={formik.touched.lastName && formik.errors.lastName} 
                onChange={formik.handleChange}
              ></Form.Control>
              {formik.touched.lastName && formik.errors.lastName && (
                <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstName">Prenume</Form.Label>
              <Form.Control type="text" name="firstName" onBlur={setTouched} value={formik.values.firstName} isInvalid={formik.touched.firstName && formik.errors.firstName} onChange={formik.handleChange}></Form.Control>
              {formik.touched.firstName && formik.errors.firstName && (
                <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" name="email" onBlur={setTouched} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} onChange={formik.handleChange}></Form.Control>
              {formik.touched.email && formik.errors.email && (
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="contractStartDate">Data Contract</Form.Label>
              <DatePicker
                dateFormat={'dd-MM-yyyy'}
                id="contractStartDate"
                name="contractStartDate"
                selected={formik.values.contractStartDate}
                onChange={(date) => formik.setFieldValue('contractStartDate', date)}
                customInput={<Form.Control />}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="contractEndDate">Data Incheiere Contract</Form.Label>
              <DatePicker
                dateFormat={'dd-MM-yyyy'}
                id="contractEndDate"
                name="contractEndDate"
                selected={formik.values.contractEndDate}
                onChange={(date) => formik.setFieldValue('contractEndDate', date)}
                customInput={<Form.Control />}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="userType">Rol</Form.Label>
              <Form.Select aria-label="User Roles" id="userRole" name="userRole" onBlur={setTouched} isInvalid={formik.touched.userRole && formik.errors.userRole} value={formik.values.userRole} onChange={formik.handleChange}>
                <option value="0">Rolul utilizatorului</option>
                {userRoles.map((role) => {
                  return (
                    <option value={role.id} key={role.id}>
                      {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.touched.lastName && formik.errors.userRole && (
                <Form.Control.Feedback type="invalid">{formik.errors.userRole}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="userType">Tip</Form.Label>
              <Form.Select aria-label="User Types" id="userType" name="userType" onBlur={setTouched} isInvalid={formik.touched.userType && formik.errors.userType} value={formik.values.userType} onChange={formik.handleChange}>
              <option value="0">Tipul utilizatorului</option>
                {userTypes.map((userType) => {
                  return (
                    <option value={userType.id} key={userType.id}>
                      {userType.type.charAt(0).toUpperCase() + userType.type.slice(1)}
                    </option>
                  );
                })}
              </Form.Select>
              {formik.touched.lastName && formik.errors.userType && (
                <Form.Control.Feedback type="invalid">{formik.errors.userType}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Add
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

export default AddUser;
