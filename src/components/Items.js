import React from 'react';
import { 
  getAllTutorials, 
  updateSelectedTutorial, 
  tutorialDeleted, 
  updateDeletedFlag, 
  allTutorialDeleted, 
  updateAllDeletedFlag 
} from '../Silces/TutorialsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AddTutorial from './AddTutorial';
import EditTutorial from './EditTutorial';
import './Items.css';

function Items() {
  const [selectedTutorial, setSelectedTutorial] = useState({});
  const dispatch = useDispatch();
  const { isLoading, data, error, isDeleted, isAllDeleted } = useSelector((state) => state.tutorials);

  const selectTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
    dispatch(updateSelectedTutorial(tutorial));
  };

  console.log("Selected Tutorial:", selectedTutorial);
  
  useEffect(() => {
    dispatch(getAllTutorials());
    if (isDeleted) {
      dispatch(updateDeletedFlag());
      setSelectedTutorial({});
      window.alert("Deleted Successfully");
    }
    if (isAllDeleted) {
      dispatch(updateAllDeletedFlag());
      setSelectedTutorial({});
      window.alert("Deleted All Tutorials Successfully");
    }
  }, [isDeleted, isAllDeleted, dispatch]);

  const handleDelete = () => {
    if (selectedTutorial._id) {
      console.log("Deleting Tutorial with ID:", selectedTutorial._id);
      dispatch(tutorialDeleted(selectedTutorial._id));
    } else {
      console.log("No Tutorial selected for deletion");
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ fontWeight: '700', paddingLeft: '50px' }}>ToDo..</div>
        </div>
      </nav>
      <div className="container">
        <div className="row my-4">
          <div className="col-sm-5">
            <div className="d-flex search">
              <input type="Text" className="form-control" id="disabledTextInput" placeholder='Search' />
              <button className='btn btn-dark'>Search</button>
            </div>
          </div>
          <div className='col-sm-6 text-end add '>
            <AddTutorial />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm'>
            <h2>Tutorials List :</h2>
            <ul className="list-group">
              {data.map(tutorial => (
                <li
                  key={tutorial._id}
                  className={tutorial.title === selectedTutorial.title ? 'list-group-item bg-secondary-subtle' : 'list-group-item'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => selectTutorial(tutorial)}
                >
                  {tutorial.title}
                </li>
              ))}
            </ul>
            <button className='btn btn-danger my-3' onClick={() => dispatch(allTutorialDeleted())}>Remove ALL</button>
          </div>
          <div className='col-sm tutorials'>
            <h2>Tutorials :</h2>
            <p><b>Title: </b>{selectedTutorial.title}</p>
            <p className='d-flex'><b className='me-2'>Description: </b>{selectedTutorial.description}</p>
            <p><b>Status: </b>{selectedTutorial.status && (selectedTutorial.status === 'pending' ? 'Pending' : 'Published')}</p>
            <div className='d-flex'>
              <div><EditTutorial /></div>
              <button className='btn btn-danger' onClick={handleDelete}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
