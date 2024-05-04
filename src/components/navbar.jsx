import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate("/");
  };

  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('token');

  const handleCreateContactClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/contacts");
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <BootstrapNavbar className="custom-navbar" bg="light" expand="lg" fluid="true">
      <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleCreateContactClick}>Create Contact</Nav.Link>
          <Nav.Link onClick={handleProfileClick}>Profile</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Nav className="end">
          {isLoggedIn ? (
            <>
              <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
