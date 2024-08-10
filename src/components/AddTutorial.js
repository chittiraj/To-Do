import React, { useEffect } from 'react';
import { useState } from 'react';
import { addTutorial, updateAddFlag} from '../Silces/TutorialsSlice';
import { useDispatch, useSelector } from 'react-redux';

function AddTutorial() {
    const [tutorialInfo, setTutorialInfo] = useState({title:'', description:'', status:'pending'});
    const dispatch = useDispatch();
    const { isAdd } = useSelector((state) => state.tutorials);
    useEffect(() =>{
        if(isAdd){
            dispatch(updateAddFlag());
        }
    },[isAdd, dispatch])
    const _addTutorial = () =>{
        console.log(tutorialInfo);
        if(tutorialInfo.title && tutorialInfo.description){
            dispatch(addTutorial(tutorialInfo));
            window.location.href = '/';
        }
    }
  
  return (
<>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Tutorial</button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Tutorial</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="mb-3 text-start">
                    <label for="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onKeyUp={(event) => setTutorialInfo({...tutorialInfo, title: event.target.value})} placeholder="Title"/>
                    </div>
                    <div className="mb-3 text-start">
                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="description" onKeyUp={(event) => setTutorialInfo({...tutorialInfo, description: event.target.value})} rows="3"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success "  onClick={_addTutorial}>Add tutorial</button>
                </div>
                </div>
            </div>
            </div>
</>

  )
}

export default AddTutorial;