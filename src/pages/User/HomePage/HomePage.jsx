import { Card, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../../context';
import { useContext, useEffect } from 'react';

const HomePage = () => {
  const { userData, dispatchUserEvent } = useContext(UserContext);

  useEffect(() => {
    console.log(userData)
  }, [])

  return (
    <>
      <Container className="homepage-container">
        <h1>Pagina de pornire</h1>
        <Row>
          <Col lg={4}>
            <Card className="p-3 mt-2">
              <h5 className="mb-2">Datele utilizatorului autentificat</h5>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between border-bottom py-1">
                  <span>Nume:</span>
                  <span>{userData.lastName}</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-1">
                  <span>Prenume:</span>
                  <span>{userData.firstName}</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-1">
                  <span>Email:</span>
                  <span>{userData.email}</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-1">
                  <span>Functie:</span>
                  <span>{userData.userRole}</span>
                </li>
                <li className="d-flex justify-content-between border-bottom py-1">
                  <span>Tip utilizator:</span>
                  <span>{userData.userType}</span>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    )
};

export default HomePage;
