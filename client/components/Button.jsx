import React, { useRef } from 'react';

const Button = ({ onClick, text }) => {
  const spanRef = useRef(null);
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
        onClick={(e) => {
          if (onClick) onClick(e); 
          addAnimation();
        }}>
        {text}
      </button>
      <span ref={spanRef} className='buttonOverlay'></span>
    </div>
  );
}

export default Button;