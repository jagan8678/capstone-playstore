import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplicationList() {
  const backgroundImageStyle = {
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrsdVgZ64g2d3fOOOp9bbuDhVLa52-ZHibw&s")',
    backgroundSize: 'cover',
    backgroundColor:"green",
    padding: '50px 0'
  };
//state variables
  const [applications, setApplications] = useState([]);  // State to hold the list of filtered applications
  const [filteredApplications, setFilteredApplications] = useState([]);   // State to hold a notification message
  const [notification, setNotification] = useState(''); /// State to keep track of the search query for filtering applications
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [comments, setComments] = useState([]);        //State to hold comments 
  const [showComments, setShowComments] = useState(false);  //State to control the visibility of comments
  const [appNotifications, setAppNotifications] = useState([]);  // State to store notifications
  const [showNotifications, setShowNotifications] = useState(false);   //State to control the visibility of notifications 
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  function fetchApplications() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5001/api/applications', {
      headers: {
        Authorization: `Bearer ${token}` //
      }
    })
    .then(response => {
      setApplications(response.data);
      setFilteredApplications(response.data);
    })
    .catch(error => {
      console.log('There was an error fetching the applications data!', error);
    });
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchQuery, applications]);

  function filterApplications() {
    const query = searchQuery.toLowerCase();
    const filtered = applications.filter(app => {
      return (
        app.name.toLowerCase().includes(query) ||
        app.ratings.toString().includes(query) ||
        app.category.toLowerCase().includes(query)
      );
    });
    setFilteredApplications(filtered);
  }

  function handleDelete(id) {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:5001/api/applications/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(() => {
        fetchApplications();
    })
    .catch(error => {
        console.log('There was an error deleting the application data!', error);
    });
  }

  function handleDownload(id) {
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:5001/api/applications/download/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
      setNotification(response.data.message);

      setTimeout(() => {
        setNotification('');
      }, 2000);

      fetchApplications();
    })
    .catch(error => {
      console.log('There was an error downloading the application!', error);
    });
  }

  function fetchComments(applicationId) {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:5001/api/reviews/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setComments(response.data);
      setShowComments(true);
    })
    .catch(error => {
      console.log('There was an error fetching the comments!', error);
    });
  }

  function handleViewComments(appId) {
    setSelectedAppId(appId);
    fetchComments(appId);
  }

  function closeCommentsModal() {
    setShowComments(false);
    setComments([]);
  }

  function fetchNotifications(applicationId) {
    const token = localStorage.getItem('token'); // retieving token from local storage
  
    axios.get(`http://localhost:5001/api/notifications/application/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Notifications response:', response.data); // Log the response
      setAppNotifications(response.data);
      setShowNotifications(true);
    })
    .catch(error => {
      console.log('There was an error fetching the notifications!', error);
    });
  }
  
  function handleFetchNotifications(appId) {
    fetchNotifications(appId);
  }

  function closeNotificationsModal() {
    setShowNotifications(false);
    setAppNotifications([]);
  }

  return (
    <div style={backgroundImageStyle}>
      <div className="h-100 p-5 text-bg-secondary">
        <div className="container mt-4">
          <h2 className="text-center mb-4">Application List</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, ratings, or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Display Notification */}
          {notification && (
            <div className="alert alert-success" role="alert">
              {notification}
            </div>
          )}

          <div className="row">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <div className="col-md-4" key={app._id} style={{ marginTop: '2%' }}>
                  <div className="card application-list-container">
                    <img src={app.image} className="card-img-top" height={200} alt={app.name} />
                    <div className="card-body">
                      <ul className="list-group" style={{ listStyleType: 'none' }}>
                        <li className="app-text" style={{ textAlign: 'center' }}>
                          <h5 className="card-title">{app.name}</h5>
                        </li>
                        <li className="app-text">Description: {app.description}</li>
                        <li className="app-text">Release Date: {app.releaseDate}</li>
                        <li className="app-text">Version: {app.version}</li>
                        <li className="app-text">Ratings: {app.ratings}</li>
                        <li className="app-text">Genre: {app.genre}</li>
                        <li className="app-text">Category: {app.category}</li>
                        <li className="app-text">Downloads: {app.downloads}</li>
                        <li className="app-text">Visibility: {app.visibility ? 'Visible' : 'Hidden'}</li>
                      </ul>
                      <div className="d-flex flex-column mt-3">
                        {/* Conditional rendering based on role */}
                        {role === 'admin' && (
                          <>
                            <button type="button" className="btn btn-danger mb-2" onClick={() => handleDelete(app._id)}>Delete</button>
                            <button type="button" className="btn" style={{ backgroundColor: 'green', color: 'white', marginBottom: '10px' }} onClick={() => navigate(`/updateapplication/${app._id}`)}>Update</button>
                            <button type="button" className="btn btn-warning mt-2" onClick={() => navigate(`/createnotification/${app._id}`)}>Create Notification</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleViewComments(app._id)}>View Comments</button>
                          </>
                        )}
                        {role === 'user' && (
                          <>
                            <button type="button" className="btn btn-info mb-2" onClick={() => handleFetchNotifications(app._id)}>View Notifications</button>
                            <button type="button" className="btn" style={{ backgroundColor: 'blue', color: 'white', marginBottom: '10px' }} onClick={() => handleDownload(app._id)}>Download</button>
                            <button type="button" className="btn" style={{ backgroundColor: 'purple', color: 'white' }} onClick={() => navigate(`/createcomment/${app._id}`)}>Create Comment</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No applications found. Please login first to see the app list</p>
            )}
          </div>

          {/* Notifications Modal */}
          {role === 'user' && showNotifications && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Notifications for Application {selectedAppId}</h5>
          <button type="button" className="btn-close" onClick={closeNotificationsModal}></button>
        </div>
        <div className="modal-body">
          {appNotifications.length > 0 ? (
            <ul className="list-group">
              {appNotifications.map(notification => (
                <li className="list-group-item" key={notification._id}>
                  <p><strong>User:</strong> {notification.user && notification.user.name ? notification.user.name : 'admin1'}</p>
                  <p><strong>Message:</strong> {notification.message}</p>
                  <p><strong>Posted:</strong> {new Date(notification.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications found for this application.</p>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeNotificationsModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}


          {/* Comments Modal */}
          {showComments && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Comments for Application {selectedAppId}</h5>
                    <button type="button" className="btn-close" onClick={closeCommentsModal}></button>
                  </div>
                  <div className="modal-body">
                    {comments.length > 0 ? (
                      <ul className="list-group">
                        {comments.map(comment => (
                          <li className="list-group-item" key={comment._id}>
                            <p><strong>User:</strong> {comment.userId.username}</p>
                            <p><strong>Comment:</strong> {comment.comment}</p>
                            <p><strong>Posted:</strong> {new Date(comment.createdAt).toLocaleDateString()}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments found for this application.</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeCommentsModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationList;
