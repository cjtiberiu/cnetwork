import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddEmployee = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contractStartDate, setContractStartDate] = useState(null);
    const [contractEndDate, setContractEndDate] = useState(null);
    const [userType, setUserType] = useState(2);

    const handleSubmit = () => {
        console.log('test');
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
                        <Button type="submit" className="w-100">
                            Add
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default AddEmployee;
