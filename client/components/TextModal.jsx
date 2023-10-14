import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';

/*
  This component renders the modal for a general purpose text based modal.
  It uses the custom TextInput and Button components.
*/

const TextModal = ({ placeholder, setterFunction, saveFunc, setIsOpen, title }) => {
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
        <Button saveFunc={saveFunc} text='Save' setIsOpen={setIsOpen} />
      </form>
    </div>
  );
};

export default TextModal;
