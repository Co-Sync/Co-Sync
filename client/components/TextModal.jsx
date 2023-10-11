import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';

const TextModal = ({ placeholder, setterFunction, onClick, setIsOpen, title }) => {
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
        <TextInput placeholder={placeholder} setterFunction={setterFunction} />
        <Button onClick={onClick} text='Save' />
      </form>
    </div>
  );
};

export default TextModal;
