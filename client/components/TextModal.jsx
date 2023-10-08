import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';
import { createColumn } from '../slices/userSlice.js';

const TextModal = ({ visible = false, eventCoords }) => {
  const dispatch = useDispatch();
  const [columnName, setColumnName] = useState('');
  const onClick = (e) => {
    e.preventDefault();
    dispatch(createColumn(columnName));
  }

  return (
    <div style={{ left: `${eventCoords.x}em`, top: `${eventCoords.y}em` }} className={`${visible ? 'textModalVisible' : 'textModalHidden'}`}>
      <form className='textModalInner'>
        <TextInput placeholder={'Column Name'} setterFunction={setColumnName} />
        <Button onClick={onClick} text='Save' />
      </form>
    </div>
  );
};

export default TextModal;
