import React from 'react';

const TaskButton = ({ onClick, text, idOverride }) => {
  return (
    <div className={'TaskButton'}>
      <button id={`${idOverride ? idOverride : ''}`} onClick={ onClick } style={{fontSize: '15px'}}>
        { text }
      </button>
    </div>
  );
};

export default TaskButton;
