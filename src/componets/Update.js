import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../features/userDetails";
import { ColorPicker, useColor } from "react-color-palette";
import { useFormik } from 'formik';
import "react-color-palette/css"; 
export const Update = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Female',
    color: '', 
  });
  console.log("updatett",updateData)

  const [color, setColor] = useColor('#000000'); 

  useEffect(() => {
    if (id && users.length > 0) {
      const singleUser = users.find((ele) => ele.id === id);
      if (singleUser) {
        setUpdateData(singleUser);
        setColor(singleUser.color); 
      }
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setUpdateData({ ...updateData, gender: value });
      }
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const updatedUserData = { ...updateData, color: color.hex }; 
    dispatch(updateUser(updatedUserData));
    console.log('Updated Data:', updatedUserData);
    navigate("/listing");
  };  

  const formik = useFormik({
    initialValues: {
      color: color,  
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <h3
        style={{
          textAlign: 'center',
          color: '#2c3e50',
          marginTop: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        className="my-2"
      >
        Edit The Data
      </h3>

      <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            placeholder="Enter your name"
            value={updateData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            placeholder="Enter your email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputAge" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            id="inputAge"
            placeholder="Enter your age"
            value={updateData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkMale"
            value="Male"
            name="gender"
            checked={updateData.gender === 'Male'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkMale">Male</label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkFemale"
            value="Female"
            name="gender"
            checked={updateData.gender === 'Female'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkFemale">Female</label>
        </div>

        <div className="mb-3" style={{ marginTop: '20px' }}>
          <label htmlFor="color" className="form-label">Select Color</label>
         <ColorPicker
           color={color}
           onChange={(newColor) => {
             setColor(newColor);
            //  formik.setFieldValue('color', newColor.hex);
           }}
           style={{
             transform: "scale(0.75)",
             transformOrigin: "top left",
             marginTop: "20px",
             marginBottom: "15px"
           }}
         />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};
