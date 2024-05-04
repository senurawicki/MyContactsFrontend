import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.message); // Log the response from the server
  
      // Store the token in session storage upon successful login
      sessionStorage.setItem('token', data.accessToken);
      
      // Optionally, you can redirect the user to another page upon successful login
      // For example, window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Form submitted:', formData);
    // You can also reset the form fields after submission if needed
    setFormData({
      username: '',
      password: ''
    });
  };
  

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Username:</Form.Label>
          <FormControl type="text" value={formData.username} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl type="password" value={formData.password} onChange={handleChange} required />
        </FormGroup>

        <Button type="submit" variant="primary">Login</Button>
      </Form>
    </div>
  );
}

export default Login;
