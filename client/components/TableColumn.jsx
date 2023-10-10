import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButton.jsx';
import TaskTextModal from './TaskTextModal.jsx';
import { deleteColumn } from '../slices/userSlice.js';
import { useDeleteColumnMutation } from '../utils/userApi.js';

const TableColumn = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventCoords, setEventCoords] = useState({ x: 0, y: 0 });
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };
  const dispatch = useDispatch();
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const body = {
      _id: column._id,
      columnName: column.columnName,
    }
    try {
      const res = await deleteColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteColumn(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container" id="tableColumnMain">
      {isOpen ? <TaskTextModal columnName={column.columnName} placeholder={'Task Name'} setIsOpen={setIsOpen} title='Enter Task Name'/> : null}
      <div id="tableColumnHeader">
        <h1>{column.columnName}</h1>
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          text='+'
        />
        <TaskButton
          onClick={(e) => handleDeleteClick(e)}
          text='-'
        />
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} setEventCoords={setEventCoords} />;
      })}
    </div>
  );
};

export default TableColumn;