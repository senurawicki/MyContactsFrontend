import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

function EditContact() {
  const { _id } = useParams(); // Get the contact ID from the URL params
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          throw new Error('Token not found');
        }
        
        const response = await fetch(`http://localhost:5001/api/contacts/${_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contact details');
        }

        const contactData = await response.json();
        setFormData(contactData);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, [_id]); // Include 'id' in the dependency array to re-fetch contact details when it changes

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
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      
      const response = await fetch(`http://localhost:5001/api/contacts/${_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      // Redirect to the saved contacts page after successfully updating the contact
      navigate('/savedcontacts');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Contact</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Contact Name:</Form.Label>
          <FormControl type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Contact Number:</Form.Label>
          <FormControl type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>

        <Button type="submit" variant="primary">Update Contact</Button>
      </Form>
    </div>
  );
}

export default EditContact;
