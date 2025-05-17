import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import regimg from '../../assets/signupbook.png';
import './Signup.css';

export const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('http://localhost:8081/signup', values);
      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-image-container">
        <img 
          src={regimg} 
          alt="Authentication" 
          className="signup-image fade-in-image"
        />
      </div>
      <div className="signup-form-container">
        <div className="signup-form">
          <h1 className="signup-title">Sign Up</h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="name-fields">
                  <TextField label="First Name" name="firstName" type="text" />
                  <TextField label="Last Name" name="lastName" type="text" />
                </div>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />

                <div className="button-group">
                  <button className="signup-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="spinner"></div>
                    ) : 'Signup'}
                  </button>
                  <button 
                    type="button" 
                    className="login-link"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};