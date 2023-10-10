import React, { useState } from 'react';
import { deleteTask, updateTask } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';

const TableTask = ({ visible = false, eventCoords, task }) => {
  //instead of task, might need to pass down props to access props.task.taskId / props.projects.projectId
  const [updateTasks, setUpdateTasks] = useState('');
  const dispatch = useDispatch();

  const makeApiCall = (url, method, body = null) => {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${method} response failed`);
        }
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  /*update tasks
  req.body:
  - projectId
  - columnId
   - taskId
   - taskName
   - taskComments on req.body */

  //should handle update task comment as well -- different button component for the comments? 
  const handleEditClick = (e) => {
    // const { taskId } = task;
    const updatedTaskData = {
      tasks: [updateTasks],
    };

    // for our slice, we take in { updateTask, taskName, projectName, columnName } as action.payload 

    e.preventDefault();
    // path of /task is how it is stated in the server side
    makeApiCall('/task', 'PATCH', updatedTaskData)
      .then((data) => {
        dispatch(updateTask(data));
      });
  }

  /* for delete task
   req.params:
   - projectId
   - columnId
   - taskId*/
  const handleDeleteClick = (e) => {
    const { projectId, columnId, taskId } = task;
    e.preventDefault();
    makeApiCall(`/task/${projectId}/${columnId}/${taskId}`, 'DELETE')
      .then((data) => {
        dispatch(deleteTask(data));
      });
  };

  // const handleDeleteClick = (e) => {
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
  // };

  return (
    <div className="container" id="tableTaskMain">
      <p>{task.taskName}</p>
      <Button onClick={(e) => handleDeleteClick(e)} text='Delete Task' />

      <div style={{ left: `${eventCoords.x - 150}px`, top: `${eventCoords.y - 50}px` }} className={`${visible ? 'textModalVisible' : 'textModalHidden'}`}>
        <form className="textModalInner">
          <TextInput placeholder={'Task Name'} setterFunction={setUpdateTasks} />
          <Button onClick={(e) => handleEditClick(e)} text='Edit Task' />
        </form>
      </div>

    </div>
  );
};

export default TableTask;
