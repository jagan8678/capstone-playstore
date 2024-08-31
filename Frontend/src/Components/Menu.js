import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menu() {
    const navigate = useNavigate();

    // Function to get the user's role from localStorage 
    const getUserRole = () => {
        return localStorage.getItem('role'); // Example role retrieval
    };

    const handleLogout = () => {
        axios.post('http://localhost:5001/api/auth/logout')
            .then(() => {
                localStorage.removeItem('token'); // remove token from localstorage
                localStorage.removeItem('userRole'); // Remove userRole on logout
                console.log('Logout Successful');
                window.alert('Logout successful');
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout error:', error);
                window.alert('Logout failed. Please try again.');
            });
    };

    const role = getUserRole();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left side with brand and icon */}
                    <div className="d-flex align-items-center">
                        <i className="bi bi-shop-window fs-3 me-2"></i> 
                        <Link className="navbar-brand" to="#">Playstore</Link>
                    </div>
                    {/* Centered Navbar Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/applicationlist">Application List</Link>
                        </li>
                        {role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/addapplication">Add Application</Link>
                            </li>
                        )}
                    </ul>

                    {/* Right side with buttons */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item">
                            <Link className="btn btn-outline-light me-2" to="/login" style={{ backgroundColor: "green" }}>Login</Link>
                            <Link className="btn btn-outline-light me-2" to="/profile" style={{ backgroundColor: "grey" }}>profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-outline-light me-2" to="/register" style={{ backgroundColor: "pink" }}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light" onClick={handleLogout} style={{ backgroundColor: "red" }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
