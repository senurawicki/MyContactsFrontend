import React, { useState, useEffect } from 'react';

function SavedContacts() {
  const [savedContacts, setSavedContacts] = useState([]);

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

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Delete contact with ID ${id}`);
  };

  return (
    <div>
      <h2>Saved Contacts</h2>
      <ul>
        {savedContacts.map(contact => (
          <li key={contact.id}>
            <p>Name: {contact.name}</p>
            <p>Phone Number: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <button onClick={() => handleEdit(contact.id)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedContacts;
