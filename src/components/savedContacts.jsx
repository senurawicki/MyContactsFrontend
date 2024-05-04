import React, { useState, useEffect } from 'react';
import { Button, Container, ListGroup, Spinner } from 'react-bootstrap';

function SavedContacts() {
  const [savedContacts, setSavedContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedContacts = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        
        const response = await fetch('http://localhost:5001/api/contacts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch saved contacts');
        }

        const savedContactsData = await response.json();
        setSavedContacts(savedContactsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved contacts:', error);
      }
    };

    fetchSavedContacts();
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Edit contact with ID ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        throw new Error('Contact ID is missing');
      }
  
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
  
      // Remove the deleted contact from the local state
      setSavedContacts(savedContacts.filter(contact => contact.id !== id));
      
      console.log(`Contact with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Saved Contacts</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ListGroup>
          {savedContacts.map(contact => (
            <ListGroup.Item key={contact.id}>
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Phone Number:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <Button variant="info" className="mr-2" onClick={() => handleEdit(contact.id)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(contact.id)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default SavedContacts;
