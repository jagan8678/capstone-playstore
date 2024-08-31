import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Comment() {
  const [comment, setComment] = useState('');
  const { id } = useParams(); // Application ID from URL
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.post('http://localhost:5001/api/reviews/addreview', {
      applicationId: id,
      comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      navigate(`/applicationlist`); // Redirect to the application list or another page
    })
    .catch(error => {
      console.log('There was an error adding the review!', error);
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Comment;
