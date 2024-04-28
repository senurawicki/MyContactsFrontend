import React, { useState, useEffect } from 'react';

function CreateContact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // UseEffect to get token from session storage
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token);
    // You can use the token for any purpose here, such as sending it in API requests
  }, []); // Empty dependency array ensures the effect runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    try {
      const response = await fetch('http://localhost:5001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Response status:', response.status); // Log the response status
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    // Handle form submission, such as sending data to the server or performing validation
    console.log('Form submitted:', formData);
    // Optionally, you can reset the form fields after submission if needed
    setFormData({
      name: '',
      phone: '',
      email: ''
    });
  };

  return (
    <div>
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Contact Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br /><br />

        <label htmlFor="phone">Contact Number:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

        <button type="submit">Create Contact</button>
      </form>
    </div>
  );
}

export default CreateContact;
