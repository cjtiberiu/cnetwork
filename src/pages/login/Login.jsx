import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import decodeToken from 'jwt-decode';
import { UserContext } from '../../context';
//import './login.scss';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const { userData, dispatchUserEvent } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, requestOptions);
    const result = await response.json();

    if (result.userData) {
      localStorage.setItem('authToken', JSON.stringify(result.userData.token));
      dispatchUserEvent('SET_USER', decodeToken(result.userData.token));
      navigate('/dashboard', { replace: true });
    }

    setDisplayResult(result.message);
  };

  return (
    <Container className="login-page">
      <Row>
        <Col lg={{ offset: 4, span: 4 }} className="login-form__wrapper p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Sign In
            </Button>
          </Form>
          <p className="text-error">{displayResult}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
