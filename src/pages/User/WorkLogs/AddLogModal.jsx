import { useState, useEffect, useContext } from 'react';
import AppModal from '../../../components/Modal/Modal';
import { UserContext } from '../../../context';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddLogModal = (props) => {
  const { showModal, handleClose } = props;
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    qty: 0,
    projectId: 0,
    userId: userData.id,
    date: ""
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getUserProjects();
  }, [])

  // TODO: store data globally
  const getUserProjects = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserdetails?userId=${userData.id}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjects(result.data.projects);
      setFormData({
        ...formData,
        projectId: result.data.projects[0].id
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/addworklog`, requestOptions);
    const result = await response.json();

    if (result.data) {
      handleClose();
    }
  }

  return (
    <AppModal show={showModal} handleClose={handleClose} title="Adauga Ore">
      <Row>
        <Col>
          <Form className="p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 col-2">
              <Form.Label htmlFor="quantity">Ore</Form.Label>
              <Form.Control type="number" name="quantity" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="userType">Proiect</Form.Label>
              <Form.Select aria-label="Proiect" id="logProject" name="logProject" value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}>
                {projects.map((project) => {
                  return (
                    <option value={project.id} key={project.id}>
                      {project.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="logDate">Data</Form.Label>
              <DatePicker
                dateFormat={'dd-MM-yyyy'}
                id="logDate"
                name="logDate"
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date: date })}
                customInput={<Form.Control />}
              />
            </Form.Group>
            <Button type="submit" className="w-100" onClick={handleSubmit}>Add</Button>
          </Form>
        </Col>
      </Row>
    </AppModal>
  )
};

export default AddLogModal;