import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import Profile from './components/profile.jsx';
import CreateContact from './components/createContact.jsx';
import SavedContacts from './components/savedContacts.jsx';
// import Home from './Home';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createcontact" element={<CreateContact />} />
          <Route path="/savedcontacts" element={<SavedContacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
