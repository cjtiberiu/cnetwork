import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddEmployee = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contractStartDate, setContractStartDate] = useState(null);
    const [contractEndDate, setContractEndDate] = useState(null);
    const [userType, setUserType] = useState(2);
    const [userTypes, setUserTypes] = useState([]);
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(() => {
        getUserTypes();
    }, []);

    useEffect(() => {
        console.log(userType);
    }, [userType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDisplayMessage('');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('authToken')),
            },
            body: JSON.stringify({ firstName, lastName, email, contractStartDate, contractEndDate, userType }),
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, requestOptions);
        const result = await response.json();

        if (result.message) {
            setDisplayMessage(result.message);
        }
    };

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

    return (
        <div>
            <h1>Add Employee</h1>
            <Row>
                <Col lg={{ span: 4 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Label htmlFor="userType">User Type</Form.Label>
                        <Form.Select className="mb-3" aria-label="User Types" id="userType" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                            {userTypes.map((userType) => {
                                return (
                                    <option value={userType.id} key={userType.id}>
                                        {userType.type.charAt(0).toUpperCase() + userType.type.slice(1)}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Button type="submit" className="w-100">
                            Add
                        </Button>
                    </Form>
                    <p>{displayMessage}</p>
                </Col>
            </Row>
        </div>
    );
};

export default AddEmployee;
