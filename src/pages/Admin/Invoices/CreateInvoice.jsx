import React, { useEffect, useRef, useState } from "react";
import { MONTHS, APP_INIT_YEAR } from "../../../utils/utils";
import { Col, Container, Row, Form, ListGroup } from "react-bootstrap";

const CreateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();

    return currentDate.getMonth();
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
  const [selectedClient, setSelectedClient] = useState(0);
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log('selectedClient', selectedClient)
    getClientInvoiceData();

  }, [selectedClient])

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
      console.log(result.data)
      setClients(result.data);
    }
  }

  const getClientInvoiceData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/invoices/clientdata?clientId=${selectedClient}&month=${selectedMonth}&year=${selectedYear}`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setInvoiceData(result.data.projects);
    }
  }

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col xs={2}>
              <Form.Group className="mb-3">
                <Form.Select className="mb-3" aria-label="Clients" id="clients" name="clients" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                  <option value="0">Selecteaza Client</option>
                  {clients.map((client) => {
                    return (
                      <option value={client.id} key={client.id}>
                        {client.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
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
          </Row>
        </Form>
        <CheckboxGroup invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        <ListGroup as="ol" numbered>
          {invoiceData.map((project, projectIndex) => {
            return project.checked && (
              <React.Fragment key={`project-${projectIndex}`}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{project.name}</div>
                    {project.users.map((user, userIndex) => {
                      return user.checked && <div key={`i-${projectIndex}${userIndex}`}>{user.name}</div>
                    })}
                  </div>
                </ListGroup.Item>
              </React.Fragment>
            )
          })}
        </ListGroup>
      </Container>
    </>
  )
};

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <Form.Check
      type="checkbox"
      label={label}
      checked={isChecked}
      onChange={onChange}
    />
  );
};

const NestedCheckbox = ({ label, isChecked, onChange, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        label={label}
        isChecked={isChecked}
        onChange={handleCheckboxChange}
      />
      {children && (
        <div style={{ marginLeft: '20px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxGroup = ({ invoiceData, setInvoiceData }) => {
  const handleCheckboxChange = (projectIndex, userIndex) => (isChecked) => {
    const tempInvoiceData = [...invoiceData];
    let projectChecked = false;

    if (userIndex !== undefined) {
      tempInvoiceData[projectIndex].users[userIndex].checked = !tempInvoiceData[projectIndex].users[userIndex].checked;
      tempInvoiceData[projectIndex].users.some(user => {
        console.log('user', user.checked)
        if (user.checked == true) {
          projectChecked = true;
        }
      })
      tempInvoiceData[projectIndex].checked = projectChecked;
      setInvoiceData(tempInvoiceData);
      return;
    } else {
      tempInvoiceData[projectIndex].checked = !tempInvoiceData[projectIndex].checked;
      for (const user of tempInvoiceData[projectIndex].users) {
        user.checked = isChecked;
      }
    }

    setInvoiceData(tempInvoiceData);
  };

  return (
    <Form>
      {invoiceData.map((project, projectIndex) => {
        return (
          <NestedCheckbox
            key={`project-${projectIndex}`}
            label={project.name}
            isChecked={invoiceData[projectIndex].checked ? invoiceData[projectIndex].checked : false}
            onChange={handleCheckboxChange(projectIndex)}
          >
            {project.users.map((user, userIndex) => {
              return (
                <Checkbox
                  key={`i-${projectIndex}${userIndex}`}
                  label={user.name}
                  isChecked={invoiceData[projectIndex].users[userIndex].checked ? invoiceData[projectIndex].users[userIndex].checked : false}
                  onChange={handleCheckboxChange(projectIndex, userIndex)}
                />
              )
            })}
          </NestedCheckbox>
        )
      })}
    </Form>
  );
};

export default CreateInvoice;