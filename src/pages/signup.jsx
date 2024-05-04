import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
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
      const response = await fetch(`http://localhost:5001/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.message); // Log the response from the server
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Form submitted:', formData);
    // You can also reset the form fields after submission if needed
    setFormData({
      name: '',
      username: '',
      email: '',
      password: ''
    });
  };
  

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Name:</Form.Label>
          <FormControl type="text" value={formData.name} onChange={handleChange} name="name" required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Username:</Form.Label>
          <FormControl type="text" value={formData.username} onChange={handleChange} name="username" required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl type="email" value={formData.email} onChange={handleChange} name="email" required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl type="password" value={formData.password} onChange={handleChange} name="password" required />
        </FormGroup>

        <Button type="submit" variant="primary">Sign Up</Button>
      </Form>
    </div>
  );
}

export default Signup;
