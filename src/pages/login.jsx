import React, { useState } from 'react';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required /><br /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
