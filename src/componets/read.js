import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, showTask, updateTask } from '../feacture/entriesSlice';
import { useNavigate } from 'react-router-dom';
import { CustomModal } from './CustomModal';
//import  Drawers from '../componets/deletemodal';
import Deletemodal from '../componets/deletemodal';
import Drawers from './drawers';

const Read = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.app);

  const [id, setId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState()
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [ConfirmMessage, setConfirmMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !(prevState))
  }

  useEffect(() => {
    dispatch(showTask());
    dispatch(updateTask());
  }, [dispatch]);



  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }
  // Display of modal delete
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage('Are You Sure You Want to Delete The User');
    setDisplayConfirmation(true)
  }
  // Hide the Modal
  const hideConfirmationModal = () => {
    setDisplayConfirmation(false);
  }
  const submitDelete = (id) => {
    dispatch(deleteTask(id))
    setDisplayConfirmation(false);

  };
  console.log('userssssssssssssss', users);

  return (

    <div className="container my-5">
      {showPopup && (
        <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}

<h2 style={{ color: 'rgb(49, 1, 66)', textAlign: 'center', padding:'20px' }}>
All Entries
</h2>

      <div className="row justify-content-center">
        {users && users.map((ele) => {
          console.log("eeee", ele.category)
          return (
            <div key={ele.id} className="col-md-6 col-lg-5 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-capitalize fw-semibold">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Type: {ele.type}</h6>
                  <p className="mb-1"><strong>Amount:</strong> ₹{ele.amount}</p>
                  <p className="mb-1"><strong>Category:</strong> {ele.category}</p>
                  <p className="mb-1"><strong>Date:</strong> {ele.date}</p>

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-light text-primary px-3"
                      onClick={() => {
                        setId(ele.id);
                        setShowPopup(true);
                      }}
                    >
                      👁 View
                    </button>
                    <button onClick={() => {
                      setId(ele.id);
                      setIsOpen(true)  }}>
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-light text-danger px-3"
                      onClick={() => showDeleteModal(ele.id)} >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Drawers open={isOpen} toggleDrawer={toggleDrawer} id={id} />
      <Deletemodal showModal={displayConfirmation} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
    </div>
  );
};

export default Read;
