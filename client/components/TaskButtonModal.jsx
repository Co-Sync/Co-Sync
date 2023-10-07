import React from 'react';

const TaskButton = ({ onClick, visible }) => {
  return (
    <div className={`${visible ? 'TaskButtonVisible' : 'TaskButtonHidden'}`}>
      <button onClick={ onClick } style={{fontSize: '15px'}}>+
      </button>
    </div>
  );
};

export default TaskButton;
