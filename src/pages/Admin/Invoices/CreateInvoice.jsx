import React, { useEffect, useRef, useState } from "react";
import { MONTHS, APP_INIT_YEAR, VAT_PERCENTAGE } from "../../../utils/constants";
import { Col, Container, Row, Form, ListGroup, Button } from "react-bootstrap";

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
  const [invoiceClientData, setInvoiceClientData] = useState(null);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    getClientInvoiceData();
  }, [selectedClient, selectedMonth, selectedYear])

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
      setInvoiceClientData({ id: result.data.clientId })
    }
  }

  const createInvoice = async () => {
    const invoiceRequestData = {
      vatPercentage: VAT_PERCENTAGE,
      clientId: invoiceClientData.id
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(invoiceRequestData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/invoices/create`, requestOptions);
    const result = await response.json();

    for (const project of invoiceData) {
      for (const user of project.users) {
        if (user.checked) {
          addInvoiceEntry(result.data, user, project);
        }
      }
    }
  }

  const addInvoiceEntry = async (invoice, user, project) => {
    const invoiceEntryData = {
      totalHours: user.totalHours,
      pricePerHour: user.pricePerHour,
      userId: user.id,
      projectId: project.id,
      invoiceId: invoice.id
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
      body: JSON.stringify(invoiceEntryData),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/invoices/addentry`, requestOptions);
    const result = await response.json();
  }

  const calculateProjectTotals = (project) => {
    let projectTotalAmount = 0;
    let projectTotalHours = 0;

    if (!project) return { projectTotalAmount, projectTotalHours };

    for (const user of project.users) {
      if (user.checked) {
        projectTotalAmount += user.totalAmount;
        projectTotalHours += user.totalHours;
      }
    }
    
    return { projectTotalAmount, projectTotalHours };
  }

  const calculateInvoiceTotals = () => {
    let invoiceTotalAmount = 0;
    let invoiceTotalHours = 0;

    if (!invoiceData) return { invoiceTotalAmount, invoiceTotalHours };

    for (const project of invoiceData) {
      for (const user of project.users) {
        if (user.checked) {
          invoiceTotalAmount += user.totalAmount;
          invoiceTotalHours += user.totalHours;
        }
      }
    }
    
    return { invoiceTotalAmount, invoiceTotalHours };       
  }

  const { invoiceTotalAmount, invoiceTotalHours } = calculateInvoiceTotals();

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
            const { projectTotalAmount, projectTotalHours } = calculateProjectTotals(project);
            return project.checked && (
              <React.Fragment key={`project-${projectIndex}`}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{project.name} | Suma Totala: {projectTotalAmount} | Ore Lucrate: {projectTotalHours}</div>
                    {project.users.map((user, userIndex) => {
                      return user.checked && <div key={`i-${projectIndex}${userIndex}`}>{user.name} | Suma Totala: {user.totalAmount} | Ore Lucrate: {user.totalHours}</div>
                    })}
                  </div>
                </ListGroup.Item>
              </React.Fragment>
            )
          })}
        </ListGroup>
        <p><strong>Total Suma: {invoiceTotalAmount}</strong> | <strong>Total Ore Lucrate: {invoiceTotalHours}</strong></p>
        <Button onClick={createInvoice}>Create</Button>
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
            label={project.name + ' (' + project.totalHours + ' ore)'}
            isChecked={invoiceData[projectIndex].checked ? invoiceData[projectIndex].checked : false}
            onChange={handleCheckboxChange(projectIndex)}
          >
            {project.users.map((user, userIndex) => {
              return (
                <Checkbox
                  key={`i-${projectIndex}${userIndex}`}
                  label={user.name + ' (' + user.totalHours + ' ore)'}
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