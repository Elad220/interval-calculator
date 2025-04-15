import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";

function TimeCalculator() {
  const [amount, setAmount] = useState(0);
  const [interval, setInterval] = useState(0);
  const [initialTime, setInitialTime] = useState("");
  const [results, setResults] = useState([]);
  const [purpose, setPurpose] = useState("Pump");
  const [customPurpose, setCustomPurpose] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialTime) return;

    const baseTime = new Date();
    const [hours, minutes] = initialTime.split(":");
    baseTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const times = [];

    for (let i = 1; i <= amount; i++) {
      const newTime = new Date(baseTime.getTime() + i * interval * 60000);
      times.push(newTime);
    }

    setResults(times);
  };

  useEffect(() => {
    if (window.atcb_init) {
      window.atcb_init();
    }
  }, [results]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
  };

  const getPurposeText = () => {
    return purpose === "Other" ? customPurpose || "Other" : purpose;
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Time Interval Generator</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} sm={6} md={4} className="mb-3">
            <Form.Group controlId="amount">
              <Form.Label>Amount to Generate</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4} className="mb-3">
            <Form.Group controlId="interval">
              <Form.Label>Interval (minutes)</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setInterval(parseInt(e.target.value))}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4} className="mb-3">
            <Form.Group controlId="purpose">
              <Form.Label>Purpose</Form.Label>
              <Form.Select
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
              >
                <option value="Pump">Pump</option>
                <option value="Other">Other</option>
              </Form.Select>
              {purpose === "Other" && (
                <Form.Control
                  type="text"
                  className="mt-2"
                  placeholder="Describe purpose"
                  onChange={(e) => setCustomPurpose(e.target.value)}
                />
              )}
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4} className="mb-3">
            <Form.Group controlId="initialTime">
              <Form.Label>Initial Time</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setInitialTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex align-items-end mb-3"
          >
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              style={{ padding: "12px 24px" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      {results.length > 0 && (
        <ListGroup className="mt-4">
          {results.map((date, idx) => {
            const startTime = formatTime(date);
            const endTime = formatTime(
              new Date(date.getTime() + interval * 60000)
            );
            const startDate = formatDate(date);
            const title = `${getPurposeText()} #${idx + 1}`;

            return (
              <ListGroup.Item key={idx} className="d-flex flex-column gap-2">
                <div>
                  #{idx + 1} – {startTime}
                </div>
                <add-to-calendar-button
                  name={title}
                  options="'Apple','Google'"
                  startDate={startDate}
                  endDate={startDate}
                  startTime={startTime}
                  endTime={endTime}
                  timeZone="Asia/Jerusalem"
                  label="Add to Calendar"
                  buttonStyle="round"
                ></add-to-calendar-button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}

export default TimeCalculator;
