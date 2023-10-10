import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButtonModal.jsx';
import TaskTextModal from './TaskTextModal.jsx';
import Button from './Button.jsx';
import { deleteColumn } from '../slices/userSlice.js';

const TableColumn = ({ column }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [eventCoords, setEventCoords] = useState({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    setToggleModal((toggleModal) => !toggleModal);
    setEventCoords({ ...eventCoords, x: e.pageX, y: e.pageY });
  };

  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const { projectId, columnId } = column;
    fetch(`/column/${projectId}/${columnId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 200) {
          // return res.json('Successful: Column Deleted');
          return res.json(); // or res.text() based off their server message
        }
      })
      .then((data) => {
        dispatch(deleteColumn(data))
      })
      .catch((err) => {
        console.error('Delete Column ERROR: ', err);
      });
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
          <Button onClick={(e) => handleDeleteClick(e)} text='Delete Column' />
        </div>
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} />;
      })}
    </div>
  );
};

export default TableColumn;
