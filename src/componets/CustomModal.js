import React from 'react';
import "../componets/CustomModal.css"
import { useSelector } from 'react-redux';

export const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const alluser = useSelector((state) => state.app.users);
  const singleUser = alluser.find((ele) => ele.id === id);

  if (!singleUser) return null;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)} title="Close Modal">&times;</button>
        <h3>Name: {singleUser.name}</h3>
        <h3>Type: {singleUser.type}</h3>
        <h3>Amount: {singleUser.amount}</h3>
        <h3>Category: {singleUser.category}</h3>
        <h3>Date: {singleUser.date}</h3>
      </div>
    </div>
  );
};
