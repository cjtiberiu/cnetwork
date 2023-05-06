import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context';
import { Container, Table, Form, Row, Col, Button } from 'react-bootstrap';
import { MONTHS, APP_INIT_YEAR } from '../../../utils/utils';
import AddLogModal from './AddLogModal';
import EditLogModal from './EditLogModal';

const WorkLogs = () => {
  const { userData } = useContext(UserContext);
  const [worklogs, setWorklogs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();

    return currentDate.getMonth() + 1;
  })
  const [years, setYears] = useState(() => {
    const years = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let i = APP_INIT_YEAR; i <= currentYear; i++) {
      years.push(i);
    }

    return years;
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    getWorkLogs();
  }, [selectedMonth])

  const getWorkLogs = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getuserworklogs/${userData.id}/${selectedMonth}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setWorklogs(result.data);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    getWorkLogs();
  }
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    getWorkLogs();
  }
  const handleShowEditModal = (logData) => {
    setSelectedLog(logData);
    setShowEditModal(true);
  }

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Form.Select aria-label="Month" id="months" name="months" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  {MONTHS.map((month) => {
                    return (
                      <option value={month.id} key={month.id}>
                        {month.month}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Form.Select aria-label="Year" id="year" name="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  {years.map((year) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Button onClick={handleShowAddModal}>Add</Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map(log => {
              const date = new Date(log.date);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const formattedDate = `${day}-${month}-${year}`;
              return (
                <tr key={log.id} onClick={() => handleShowEditModal(log)} style={{ cursor: "pointer" }}>
                  <td>{formattedDate}</td>
                  <td>{log.project.name}</td>
                  <td>{log.qty}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <AddLogModal showModal={showAddModal} handleClose={handleCloseAddModal} />
        <EditLogModal showModal={showEditModal} handleClose={handleCloseEditModal} selectedLog={selectedLog} />
      </Container>
    </>
  )
};

export default WorkLogs;
