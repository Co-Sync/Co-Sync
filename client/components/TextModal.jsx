import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';

const TextModal = ({ visible = false, eventCoords, placeholder, setterFunction, onClick }) => {
  return (
    <div style={{ left: `${eventCoords.x}em`, top: `${eventCoords.y}em` }} className={`${visible ? 'textModalVisible' : 'textModalHidden'}`}>
      <form className='textModalInner'>
        <TextInput placeholder={placeholder} setterFunction={setterFunction} />
        <Button onClick={onClick} text='Save' />
      </form>
    </div>
  );
};

export default TextModal;
