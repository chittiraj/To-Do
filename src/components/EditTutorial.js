import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUpdatedFlag, updateTutorial } from '../Silces/TutorialsSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditTutorial() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {selectedTutorial, isUpdated} = useSelector((state) => state.tutorials);
    const [tutorialInfo, setTutorialInfo] = useState({title:'', description:'', status:'pending'});
    const dispatch = useDispatch();
    useEffect (() =>{
        setTutorialInfo(selectedTutorial);
        if (isUpdated){
          dispatch(updateUpdatedFlag());
          window.location.href ='/';
        }
    }, [isUpdated, selectedTutorial, dispatch]);
    const edittutorial = () =>{
        if(tutorialInfo.title && tutorialInfo.description){
          dispatch(updateTutorial(tutorialInfo));
          handleClose();
        }
    }
  return (
    <>
    <Button variant="warning" className= " me-2" onClick={handleShow}>
      Edit
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
                <div className="modal-body">
                        <div className="mb-3 text-start">
                            <label for="exampleFormControlInput1" className="form-label"><b>Title:</b></label>
                            <input type="text" className="form-control" id="title" value={tutorialInfo.title} onChange={(event) => setTutorialInfo((prevState) => ({...prevState, title: event.target.value}))} placeholder="Title"/>
                        </div>
                        <div className="mb-3 text-start">
                            <label for="exampleFormControlTextarea1" className="form-label"><b>Description: </b></label>
                            <textarea className="form-control" id="description" placeholder="Description" value={tutorialInfo.description} onChange={(event) => setTutorialInfo((prevState) => ({...prevState, description: event.target.value}))} rows="3"> </textarea>
                        </div>
                        <div className='mb-3 text-start'>
                            <p><b>Status: </b>{selectedTutorial.status && (selectedTutorial.status === 'pending'? 'Pending':'Published')}</p>
                        </div>
                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={edittutorial}>Add tutorial</button>
                </div> */}
      </Modal.Body>
      <Modal.Footer>
        <div>
        <Button variant="warning" onClick={edittutorial}>
          Edit Tutorial
        </Button>
        </div>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default EditTutorial;