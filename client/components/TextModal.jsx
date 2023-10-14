import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';

// a component that renders a modal upon clicking and its designated setter func - this is exported in multiple files to render a pop-up modal throughout our project

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
