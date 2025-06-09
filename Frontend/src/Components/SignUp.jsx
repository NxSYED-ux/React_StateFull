import React, { useState } from 'react';
import axiosInstance from '../axiosInstace';
import './Styles/SignUp.css';

export default function SignUp() {
    const [formdata, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/SignUp', formdata);
            if (response.status === 200) {
                setSuccess('User Registered Successfully');
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('Error Registering');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
            <div className="signup-container">
                <h2>Signup Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullname" value={formdata.fullname} onChange={handleChange} placeholder="Full Name" required />
                    <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password" required />
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </>
    );
}
