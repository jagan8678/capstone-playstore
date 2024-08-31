import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateNotification() {
  const { id } = useParams(); // Retrieve the application ID from the URL params
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.post(`http://localhost:5001/api/notifications/create/${id}`, {
      userId: localStorage.getItem('userId'), // Or get userId from context or state
      message
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setNotification(response.data.message);
      setTimeout(() => {
        setNotification('');
        navigate('/applicationlist'); // Navigate to  the application list
      }, 2000);
    })
    .catch(error => {
      console.log('There was an error creating the notification!', error);
    });
  };

  return (
    <div className="container mt-4" >
      <h2 className="text-center mb-4">Create Notification</h2>

      {/* Display Notification */}
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}

      <form onSubmit={handleSubmit} >
        <div className="form-group" >
          <label htmlFor="notificationMessage">Notification Message</label>
          <textarea
            id="notificationMessage"
            className="form-control"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Notification</button>
      </form>
    </div>
  );
}

export default CreateNotification;
