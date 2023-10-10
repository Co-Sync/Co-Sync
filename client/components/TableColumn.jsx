import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButtonModal.jsx';
import TaskTextModal from './TaskTextModal.jsx';
import { deleteColumn } from '../slices/userSlice.js';
import {useDeleteColumnMutation} from '../utils/userApi.js';

const TableColumn = ({ column }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [eventCoords, setEventCoords] = useState({ x: 0, y: 0 });
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const handleInputChange = (e) => {
    setToggleModal((toggleModal) => !toggleModal);
    const coords = e.target.getBoundingClientRect();
    setEventCoords({ x: coords.x / 34.5, y: coords.y / 38 });
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
      <div id="tableColumnHeader">
        <h1>{column.columnName}</h1>
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          visible={toggleModal}
          text='+'
        />
        <TaskTextModal
          visible={toggleModal}
          eventCoords={eventCoords}
          columnName={column.columnName}
        />
        <TaskButton 
          onClick={(e) => handleDeleteClick(e)} 
          text='-' 
        />
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} eventCoords={eventCoords} visible={toggleModal}/>;
      })}
    </div>
  );
};

export default TableColumn;