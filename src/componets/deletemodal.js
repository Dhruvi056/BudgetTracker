import React from 'react'
import{Modal,Button} from "react-bootstrap";

 const Deletemodal = ({showModal,hideModal,confirmModal,id,message}) => {
  return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className='alert alert-danger'>{message}</div></Modal.Body>
            <Modal.Footer>
                <Button variant='default' onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant='danager' onClick={()=>confirmModal(id)}>
                Delete
                </Button>
            </Modal.Footer>
        </Modal>
  )
}
export default Deletemodal;