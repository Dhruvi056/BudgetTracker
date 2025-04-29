import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-modern-drawer/dist/index.css';
import { updateTask, showTask} from "../feacture/entriesSlice";

const Drawers = ({ toggleDrawer, open, id }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);

  // No need to redeclare 'id' here since it's passed as a prop
  // const { id } = useParams(); // Remove this line

  useEffect(() => {
    console.log(id); // This should log the 'id' passed as a prop
  }, [id]);

  const [updateData, setUpdateData] = useState({
    name: '',
    type: '',
    amount: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    if (id && users.length > 0) {
      const singleUser = users.find((ele) => ele.id === id);
      if (singleUser) {
        setUpdateData(singleUser);
      }
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleTypeChange = (value) => {
    setUpdateData({ ...updateData, type: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(updateData)).then(() => {
      // After updating, refresh the task list
      dispatch(showTask());
      toggleDrawer();
      navigate("/listing");
    });
  };
  

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      direction="right"
      style={{ width: '450px' }}
    >
      <div style={{ padding: '20px', position: 'relative' }}>
        <button
          type="button"
          onClick={toggleDrawer}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
          aria-label="Close">
          &times;
        </button>

        <h3 style={{
          textAlign: 'center',
          color: '#2c3e50',
          marginTop: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}>
          Edit The Data
        </h3>

        <form className="w-100 mx-auto mt-4" onSubmit={handleSubmit}>
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
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={updateData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="income"
                  name="type"
                  value="Income"
                  checked={updateData.type === "Income"}
                  onChange={() => handleTypeChange("Income")}
                />
                <label className="form-check-label" htmlFor="income">Income</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="expense"
                  name="type"
                  value="Expense"
                  checked={updateData.type === "Expense"}
                  onChange={() => handleTypeChange("Expense")}
                />
                <label className="form-check-label" htmlFor="expense">Expense</label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={updateData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Gym">Gym</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
              <option value="Enjoy">Enjoy</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={updateData.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </Drawer>
  );
};
export default Drawers;
