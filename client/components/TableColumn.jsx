import React, { useState } from 'react';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButtonModal.jsx';
import TaskTextModal from './TaskTextModal.jsx';

const TableColumn = ({ column }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [eventCoords, setEventCoords] = useState({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    setToggleModal((toggleModal) => !toggleModal);
    setEventCoords({ ...eventCoords, x: e.pageX, y: e.pageY });
  };
  
  return (
    <div className="container" id="tableColumnMain">
      <div id="tableColumnHeader">
        <h1>{column.columnName}</h1>
        <div>
          <TaskButton
            onClick={(e) => handleInputChange(e)}
            visible={toggleModal}
          />
          <TaskTextModal
            visible={toggleModal}
            eventCoords={eventCoords}
            columnName={column.columnName}
          />
        </div>
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} />;
      })}
    </div>
  );
};

export default TableColumn;
