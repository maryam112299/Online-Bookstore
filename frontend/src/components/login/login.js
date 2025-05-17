import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8081/login', {
        email: values.email,
        password: values.password
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />

              <div className="button-group">
                <button className="login-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="spinner"></div>
                  ) : 'Login'}
                </button>
                <button 
                  type="button" 
                  className="signup-link"
                  onClick={() => navigate('/signup')}
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};