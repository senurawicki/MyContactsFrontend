import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Clear token from session storage
    sessionStorage.removeItem('token');
    navigate("/");   // Navigate to the home page after logout
  };

  return (
    <BootstrapNavbar className="custom-navbar" bg="light" expand="lg" fluid>
      <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/createcontact">Create Contact</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Nav className="end">
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
