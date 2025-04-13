import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

function TimeCalculator() {
  const [amount, setAmount] = useState(0);
  const [interval, setInterval] = useState(0);
  const [initialTime, setInitialTime] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialTime) return;

    const baseTime = new Date(`1970-01-01T${initialTime}:00`);
    const times = [];

    for (let i = 0; i < amount; i++) {
      const newTime = new Date(baseTime.getTime() + i * interval * 60000);
      times.push(newTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }

    setResults(times);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Time Interval Generator</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="interval">
              <Form.Label>Interval (minutes)</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setInterval(parseInt(e.target.value))}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="initialTime">
              <Form.Label>Initial Time</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setInitialTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4} className="d-flex align-items-end">
            <Button type="submit" variant="primary" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      {results.length > 0 && (
        <ListGroup className="mt-4">
          {results.map((time, idx) => (
            <ListGroup.Item key={idx}>#{idx + 1} - {time}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default TimeCalculator;
