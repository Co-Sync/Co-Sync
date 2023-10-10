import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import { useDispatch } from 'react-redux';
import { createColumn } from '../slices/userSlice.js';
import { useAddColumnMutation } from '../utils/userApi.js';

const TextModal = ({ visible = false, eventCoords }) => {
  const dispatch = useDispatch();
  const [columnName, setColumnName] = useState('');
  const [addColumn] = useAddColumnMutation();
  const onClick = async (e) => {
    e.preventDefault();
    try {
      const res = await addColumn({ columnName });
      if (res.error) throw new Error(res.error.message);
      dispatch(createColumn(res.data));
    } catch (err) {
      console.log(err);
    }
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
