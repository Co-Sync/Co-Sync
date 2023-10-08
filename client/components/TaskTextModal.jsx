import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';
import { createTask } from '../slices/userSlice.js';

const TaskTextModal = ({ visible = false, eventCoords, columnName }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const onClick = (e) => {
    e.preventDefault();
    dispatch(createTask({columnName, task}));
  };

  return (
    <div style={{ left: `${eventCoords.x}em`, top: `${eventCoords.y}em` }} className={`${visible ? 'textModalVisible' : 'textModalHidden'}`}>
      <form className="textModalInner">
        <TextInput placeholder={'Task Name'} setterFunction={setTask} />
        <Button onClick={onClick} text="Save" />
      </form>
    </div>
  );
};

export default TaskTextModal;
