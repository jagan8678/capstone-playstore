import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: 'user',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            role: Yup.string().oneOf(['admin', 'user'], 'Invalid Role').required('Required'),
        }),
        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            axios.post('http://localhost:5001/api/auth/register', values)
                .then(response => {
                    console.log('Registration Success:', response);
                    setStatus('success');
                    resetForm();
                    navigate('/login');//navigate to login
                })
                .catch(error => {
                    console.error('Registration Error:', error);
                    setStatus('error');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className='reg' style={{backgroundColor:"pink",padding:"50px"}}>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Register</h2>
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
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        id="role"
                                        className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                                        {...formik.getFieldProps('role')}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {formik.touched.role && formik.errors.role ? (
                                        <div className="invalid-feedback">{formik.errors.role}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                                {formik.status === 'success' && <div className="alert alert-success mt-3">Registration successful!</div>}
                                {formik.status === 'error' && <div className="alert alert-danger mt-3">Registration failed. Please try again.</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;