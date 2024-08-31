import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateApplication = () => {
    const backgroundImageStyle = {
        backgroundImage: 'url("https://tse2.mm.bing.net/th?id=OIP.lIRgrN_WE67eIfApu3wGwwHaGL&pid=Api&P=0&h=180")',
        backgroundSize: 'cover',
        padding: '50px 0'
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5001/api/applications/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the headers
            }
        })
        .then(response => {
            setApplication(response.data);
        })
        .catch(error => {
            console.error("Error fetching application:", error);
        });
    }, [id]);

   

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: application?.image || '',
            name: application?.name || '',
            description: application?.description || '',
            releaseDate: application?.releaseDate || '',
            version: application?.version || '',
            ratings: application?.ratings || '',
            genre: application?.genre || '',
            category: application?.category || '',
            downloads: application?.downloads || 0,
            visibility: application?.visibility || true
        },
        validationSchema: Yup.object({
            image: Yup.string().required('Image URL is required'),
            name: Yup.string().min(5, 'Name must be at least 5 characters').required('Name is required'),
            description: Yup.string().required('Description is required'),
            releaseDate: Yup.date().required('Release Date is required'),
            version: Yup.string().required('Version is required'),
            ratings: Yup.number().min(0, 'Ratings must be greater than or equal to 0').max(5, 'Ratings must be less than or equal to 5').required('Ratings is required'),
            genre: Yup.string().required('Genre is required'),
            category: Yup.string().required('Category is required'),
            downloads: Yup.number().min(0, 'Downloads must be greater than or equal to 0').required('Downloads is required'),
            visibility: Yup.boolean().required('Visibility is required')
        }),
        onSubmit: (values, { setSubmitting, setStatus }) => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            axios.put(`http://localhost:5001/api/applications/update/${id}`, values, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in the header
                }
            })
                .then(response => {
                    setStatus('success');
                    navigate('/applicationlist'); // Redirect to the application list page
                })
                .catch(error => {
                    console.error('Error updating application:', error);
                    setStatus('error');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div style={backgroundImageStyle}>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Update Application</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='image' className='form-label'>Image URL</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="text"
                                    className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.image}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <div className='invalid-feedback'>{formik.errors.image}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className='invalid-feedback'>{formik.errors.name}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='description' className='form-label'>Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className='invalid-feedback'>{formik.errors.description}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='releaseDate' className='form-label'>Release Date</label>
                                <input
                                    id="releaseDate"
                                    name="releaseDate"
                                    type="date"
                                    className={`form-control ${formik.touched.releaseDate && formik.errors.releaseDate ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.releaseDate}
                                />
                                {formik.touched.releaseDate && formik.errors.releaseDate ? (
                                    <div className='invalid-feedback'>{formik.errors.releaseDate}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='version' className='form-label'>Version</label>
                                <input
                                    id="version"
                                    name="version"
                                    type="text"
                                    className={`form-control ${formik.touched.version && formik.errors.version ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.version}
                                />
                                {formik.touched.version && formik.errors.version ? (
                                    <div className='invalid-feedback'>{formik.errors.version}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='ratings' className='form-label'>Ratings</label>
                                <input
                                    id="ratings"
                                    name="ratings"
                                    type="number"
                                    step="0.1"
                                    className={`form-control ${formik.touched.ratings && formik.errors.ratings ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ratings}
                                />
                                {formik.touched.ratings && formik.errors.ratings ? (
                                    <div className='invalid-feedback'>{formik.errors.ratings}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='genre' className='form-label'>Genre</label>
                                <input
                                    id="genre"
                                    name="genre"
                                    type="text"
                                    className={`form-control ${formik.touched.genre && formik.errors.genre ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.genre}
                                />
                                {formik.touched.genre && formik.errors.genre ? (
                                    <div className='invalid-feedback'>{formik.errors.genre}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='category' className='form-label'>Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    className={`form-control ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category}
                                />
                                {formik.touched.category && formik.errors.category ? (
                                    <div className='invalid-feedback'>{formik.errors.category}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='downloads' className='form-label'>Downloads</label>
                                <input
                                    id="downloads"
                                    name="downloads"
                                    type="number"
                                    className={`form-control ${formik.touched.downloads && formik.errors.downloads ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.downloads}
                                />
                                {formik.touched.downloads && formik.errors.downloads ? (
                                    <div className='invalid-feedback'>{formik.errors.downloads}</div>
                                ) : null}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='visibility' className='form-label'>Visibility</label>
                                <select
                                    id="visibility"
                                    name="visibility"
                                    className={`form-control ${formik.touched.visibility && formik.errors.visibility ? 'is-invalid' : ''}`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.visibility}
                                >
                                    <option value="true">Visible</option>
                                    <option value="false">Hidden</option>
                                </select>
                                {formik.touched.visibility && formik.errors.visibility ? (
                                    <div className='invalid-feedback'>{formik.errors.visibility}</div>
                                ) : null}
                            </div>

                            <button type='submit' className='btn btn-primary' disabled={formik.isSubmitting}>
                                Update Application
                            </button>

                            {formik.status === 'success' && <div className='text-success mt-3'>Application updated successfully!</div>}
                            {formik.status === 'error' && <div className='text-danger mt-3'>Error updating application. Please try again.</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateApplication;
