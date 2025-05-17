import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from '../TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './Profile.css';

const Profile = () => {
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`http://localhost:8081/profile?email=${user.email}`)
  }, [user.email]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8081/profile/update', values)
      .then(res => {
        alert(res.data.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" disabled />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;