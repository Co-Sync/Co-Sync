import React from 'react';

/*
  This component renders a button for the task modal e.g move/edit.
*/

const TaskButton = ({ onClick, text, idOverride, imgSrc }) => {
  return (
    <div className={'TaskButton'}>
      <button id={`${idOverride ? idOverride : ''}`} onClick={onClick} style={{ fontSize: '15px' }}>
        {imgSrc ? <div style={{ margin: '0px', padding: '0px' }}>
          <img src={imgSrc} alt={text} width='18' height='16' /></div> : text}
      </button>
    </div>
  );
};

export default TaskButton;
