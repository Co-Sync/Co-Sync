import React from 'react';
import { deleteTask } from '../slices/userSlice';
import { useDispatch } from 'react-redux';

const TableTask = ({ task }) => {
  //instead of task, might need to pass down props to
  //access props.task.taskId / props.projects.projectId
  const dispatch = useDispatch();

  /*update tasks access the - projectId
  - columnId
   - taskId
   - taskName
   - taskComments on req.body */

  const handleDeleteClick = (e) => {
    /*
      e.preventDefault(); 
      fetch(`/task/${projectId}/${columnId}/${taskId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      .then((res) => {
        if (res.status === 200) {
          return res.send('Successful: Task Deleted');
        }
      })
      .then((data) => {
        dispatch(deleteTask(data))
      })
      .catch((err) => {
        console.error('Delete Task ERROR: ', err);
      });
     }*/
  }

  return (
    <div className='container' id='tableTaskMain'>
      <p>{ task.taskName }</p>
      <button onClick={(e) => handleDeleteClick(e)}>Delete Task</button>
    </div>
  );
};

export default TableTask;