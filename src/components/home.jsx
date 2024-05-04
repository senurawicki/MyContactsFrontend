import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, ListGroup } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Card.Title className="text-center">Welcome to Contacts Management System</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link to="/create-contact" className="btn btn-primary">Create Contact</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/saved-contacts" className="btn btn-success">View Saved Contacts</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/logout" className="btn btn-danger">Logout</Link>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
