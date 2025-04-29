import React from 'react';
import { useDispatch } from "react-redux";
import { createTask } from "../feacture/entriesSlice";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'Income',
      amount: '',
      category: '',
      date: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters')
        .required('Name is required'),
      type: Yup.string()
        .oneOf(['Income', 'Expense'], 'Type must be Income or Expense')
        .required('Please select Type'),
      amount: Yup.number()
        .positive('Amount must be positive')
        .required('Amount is required'),
      category: Yup.string()
        .oneOf(['Food', 'Gym', 'Shopping', 'Salary'], 'Invalid category')
        .required('Category must be selected'),
      date: Yup.date().required('Date is required'),
    }),
    onSubmit: (values) => {
      dispatch(createTask(values));
      navigate("/listing");
    }
  });

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#2c3e50", marginTop: "20px", fontWeight: "bold", textTransform: "uppercase" }} className='my-2'>
        Fill The Data
      </h3>

      <form className="w-50 mx-auto mt-4" onSubmit={formik.handleSubmit}>
      
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
        </div>

       
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount && <div className="text-danger">{formik.errors.amount}</div>}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Type</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="income"
                name="type"
                value="Income"
                checked={formik.values.type === "Income"}
                onChange={() => formik.setFieldValue("type", "Income")}
              />
              <label className="form-check-label" htmlFor="income">Income</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="expense"
                name="type"
                value="Expense"
                checked={formik.values.type === "Expense"}
                onChange={() => formik.setFieldValue("type", "Expense")}
              />
              <label className="form-check-label" htmlFor="expense">Expense</label>
            </div>
          </div>
          {formik.touched.type && formik.errors.type && <div className="text-danger">{formik.errors.type}</div>}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">-- Select Category --</option>
            <option value="Food">Food</option>
            <option value="Gym">Gym</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
          </select>
          {formik.touched.category && formik.errors.category && <div className="text-danger">{formik.errors.category}</div>}
        </div>

      
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date && <div className="text-danger">{formik.errors.date}</div>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default Create;

