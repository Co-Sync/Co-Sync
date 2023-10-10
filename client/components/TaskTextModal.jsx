import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';
import { createTask } from '../slices/userSlice.js';

//FOR ADD TASK ?

const TaskTextModal = ({ columnName, placeholder, setIsOpen, title }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const onClick = (e) => {
    e.preventDefault();
    dispatch(createTask({ columnName, task }));
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
        <Button onClick={onClick} text='Save' />
      </form>
    </div>
  );
};

export default TaskTextModal;
