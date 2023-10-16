import React from 'react';

/*
  This component renders the custom button component.
*/

const Button = ({ saveFunc, text, setIsOpen, idOverride, }) => {
  return (
    <div id={`${idOverride ? idOverride : ''}`} className='buttonMain'>
      <button
        className='buttonInput'
        onClick={(e) => {
          e.preventDefault();
          if (setIsOpen) setIsOpen(prev => !prev);
          if (saveFunc) saveFunc(e); 
        }}>
        {text}
      </button>
    </div>
  );
}

export default Button;