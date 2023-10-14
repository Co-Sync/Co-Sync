import React from 'react';

const ColumnViewModal = ({ setIsOpen, title, saveFunc, currentProject }) => {
  return (
    <div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              console.log(setIsOpen)
              setIsOpen(prev => !prev)
            }} 
            className='closeModalButton'>x</button>
        </div>
        <div className='projectsList'>
          {currentProject?.columns.map((column, index) => {
            return <button value={column._id} onClick={saveFunc} className='projectsListButton' key={index}>{column.columnName}</button>
          })}
        </div>
      </form>
    </div>
  );
}

export default ColumnViewModal;