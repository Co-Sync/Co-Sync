import React, { useState } from 'react';
import { deleteTask, updateTask } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../utils/userApi.js';

const TableTask = ({ task, eventCoords }) => {
  //instead of task, might need to pass down props to access props.task.taskId / props.projects.projectId
  const [incomingData, setIncomingData] = useState('');
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const dispatch = useDispatch();

  const handleEditClick = async (e) => {
    e.preventDefault();
    const body = {
      incomingData,
    };
    try {
      const res = await updateTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(updateTask(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  /* for delete task
   req.params:
   - projectId
   - columnId
   - taskId*/
  const handleDeleteClick = (e) => {
    e.preventDefault();
    const body = {
      _id: task.taskId,
      taskName: task.taskName
    };
    try {
      const res = deleteTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteTask(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container" id="tableTaskMain">
      <p>{task.taskName}</p>
      <div id='tableTaskButtons'>
        <TaskButton
          onClick={(e) => handleDeleteClick(e)}
          text='Delete'
          idOverride='innerTaskButton' />
        <TaskButton
          onClick={() => setToggleModal(!toggleModal)}
          text='Edit'
          idOverride='innerTaskButton'
        />
        <TaskButton
          onClick={() => setToggleModal(!toggleModal)}
          text='Comment'
          idOverride='innerTaskButton'
        />
        {toggleModal && (<TextModal
          eventCoords={eventCoords}
          visible={toggleModal}
          placeholder={'Task Name'}
          setterFunction={setIncomingData}
          onClick={(e) => handleEditClick(e)}
        />)}
      </div>
    </div>
  );
};

export default TableTask;
