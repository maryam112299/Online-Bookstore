import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Dashboard.css';

const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'History',
  'Biography', 'Fantasy', 'Romance', 'Thriller'
];

const AddBookForm = ({ onCancel, onSuccess }) => {
  const initialValues = {
    title: '',
    author: '',
    price: '',
    stock: '',
    rate: '',
    category: '',
    description: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    price: Yup.number().required('Price is required').positive(),
    stock: Yup.number().required('Stock is required').integer().min(0),
    rate: Yup.number().min(0).max(5),
    category: Yup.string().required('Category is required'),
    description: Yup.string().max(1000, 'Description too long'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:8081/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          price: parseFloat(values.price),
          stock: parseInt(values.stock),
          rate: parseFloat(values.rate)
        }),
      });

      const data = await response.json();
      if (data.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Title</label>
              <Field name="title" type="text" />
            </div>

            <div className="form-group">
              <label>Author</label>
              <Field name="author" type="text" />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <Field name="price" type="number" step="0.01" />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <Field name="stock" type="number" />
            </div>

            <div className="form-group">
              <label>Rating (0-5)</label>
              <Field name="rate" type="number" step="0.1" min="0" max="5" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <Field as="select" name="category">
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Field>
            </div>

            <div className="form-group">
              <label>Description</label>
              <Field as="textarea" name="description" rows="4" />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={isSubmitting} className="save-btn">
                {isSubmitting ? 'Adding...' : 'Add Book'}
              </button>
              <button type="button" onClick={onCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBookForm;