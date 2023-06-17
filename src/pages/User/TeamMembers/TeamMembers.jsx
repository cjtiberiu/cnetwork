import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    getTeamMembers();
  }, []);

  const getTeamMembers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusers`, requestOptions);
    const result = await response.json();

    if (result.users) {
      setMembers(result.users);
    }
  };

  return (
    <Container>
      <Row>
        {members.map((member) => {
          return (
          <Col className="p-2" xs={12} lg={3} key={member.id}>
            <div className="card p-3 d-flex flex-column align-items-center justify-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#025464" className="fs-30" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              </svg>
              <span className="mt-2"><strong>{member.firstName} {member.lastName}</strong></span>
              <span className="mt-1">{member.userRole}</span>
            </div>
          </Col>
          )
        })}
      </Row>
    </Container>
  );
};

export default TeamMembers;
