import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:5001/api/user/current', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Profile</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title className="text-center">User Details</Card.Title>
            <Card.Text>
              {/* <p><strong>Name:</strong> {user.name}</p> */}
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </Card.Text>
            <Button variant="primary" onClick={() => navigate('/savedcontacts')}>Saved Contacts</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Profile;
