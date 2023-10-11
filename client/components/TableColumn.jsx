import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButton.jsx';
import TaskTextModal from './TaskTextModal.jsx';
import { deleteColumn } from '../slices/userSlice.js';
import { useDeleteColumnMutation } from '../utils/userApi.js';

const TableColumn = ({ column, currentProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  const handleDeleteClick = async () => {
    // e.preventDefault();
    //_id is coming back as undefined: http://localhost:8080/api/project/column/undefined/undefined
    //payload works though -- selecting 'column1'

    const body = {
      columnId: column._id,
      projectId: currentProject._id,
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
      {isOpen ? <TaskTextModal columnName={column.columnName} placeholder={'Task Name'} setIsOpen={setIsOpen} title='Enter Task Name' /> : null}
      <div id="tableColumnHeader">
        <h1>{column.columnName}</h1>
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          text='+'
        />
        <TaskButton
          onClick={() => handleDeleteClick(column._id, column.columnName)}
          text='-'
        />
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} column={column} currentProject={currentProject} />;
      })}
    </div>
  );
};

export default TableColumn;