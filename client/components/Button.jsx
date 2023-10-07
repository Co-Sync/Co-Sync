import React from 'react';

const Button = ({ onClick, text }) => {
  const spanRef = React.useRef(null);
  const addAnimation = () => {
    spanRef.current.classList.add('buttonOverlayAnimation');
    setTimeout(() => {
      spanRef.current.classList.remove('buttonOverlayAnimation');
    }, 500);
  }
  return (
    <div className='buttonMain'>
      <button 
        className='buttonInput' 
        type='submit' 
        onClick={(e) => {
          onClick(e); 
          addAnimation();
        }}>
        {text}
      </button>
      <span ref={spanRef} className='buttonOverlay'></span>
    </div>
  );
}

export default Button;