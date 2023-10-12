import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';
import { createTask } from '../slices/userSlice.js';
import { useAddTaskMutation } from '../utils/userApi.js';

const TaskTextModal = ({ column, currentProject, placeholder, setIsOpen, title }) => {
  const dispatch = useDispatch();
  const [addTaskMutation] = useAddTaskMutation();
  const [task, setTask] = useState('');

  // Body: { projectId, columnId, taskName}
  const handleAddTaskClick = async (e) => {
    e.preventDefault();
    const body = {
      taskName: task,
      columnId: column._id,
      projectId: currentProject._id
    };

    console.log('body', body);
    try {
      if (!task) {
        console.error('No task provided');
        return;
      }
      const res = await addTaskMutation(body);
      console.log('res', res);
      dispatch(createTask({ taskName: res.data, columnId: column._id, projectId: currentProject._id }));
      // setIsOpen(false);
    } catch (error) {
      console.log('Error in handleDeleteClick: ', error);
    }
  };

  return (
    <div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(prev => !prev)
            }}
            className='closeModalButton'>x</button>
        </div>
        <TextInput placeholder={placeholder} setterFunction={setTask} />
        <Button onClick={handleAddTaskClick} text='Save' />
      </form>
    </div>
  );
};

export default TaskTextModal;
