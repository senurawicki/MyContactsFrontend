import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const handleLogout = () => {
        // Clear token from session storage
        sessionStorage.removeItem('token');
        // Optionally, redirect to the login page or any other page after logout
        // window.location.href = '/login';
      };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createcontact">Create Contact</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
        <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
