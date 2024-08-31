import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values, { setSubmitting, setStatus }) => {
            axios.post('http://localhost:5001/api/auth/login', values)
                .then(response => {
                    console.log('Login Success:', response);
                    // Store token and role in localStorage
                    localStorage.setItem('token', response.data.token); // Adjust based on your response structure
                    localStorage.setItem('role', response.data.role); // Assuming the role is sent in the response
                    setStatus({ type: 'success', message: 'Login successful!' });
                    navigate('/applicationlist'); // Redirect to home or another route
                })
                .catch(error => {
                    console.error("Login error:", error);
                    // Check if the error response indicates invalid credentials
                    if (error.response && error.response.status === 401) {
                        setStatus({ type: 'error', message: 'Invalid credentials. Please try to register first' });
                    } else {
                        setStatus({ type: 'error', message: 'Login failed. Please try again.' });
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div style={{backgroundColor:"goldenrod",padding:"50px"}}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Login</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            id="username"
                                            type="text"
                                            className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                            {...formik.getFieldProps('username')}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="invalid-feedback">{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                            {...formik.getFieldProps('password')}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="invalid-feedback">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={formik.isSubmitting}>
                                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                    {formik.status && formik.status.type === 'success' && (
                                        <div className="alert alert-success mt-3">{formik.status.message}</div>
                                    )}
                                    {formik.status && formik.status.type === 'error' && (
                                        <div className="alert alert-danger mt-3">{formik.status.message}</div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
