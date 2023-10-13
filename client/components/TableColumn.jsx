import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import { deleteColumn, createTask } from '../slices/userSlice.js';
import { useDeleteColumnMutation, useAddTaskMutation } from '../utils/userApi.js';

const TableColumn = ({ column, currentProject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [task, setTask] = useState('');
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const [addTaskMutation] = useAddTaskMutation();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  }

  const handleAddTask = async (e) => {
    e.preventDefault();
    const body = {
      taskName: task,
      taskComments: '',
      columnId: column._id,
      projectId: currentProject._id
    };

    try {
      if (!task) {
        console.error('No task provided');
        return;
      }
      const res = await addTaskMutation(body);
      console.log('res', res);
      dispatch(createTask({ taskName: res.data, columnId: column._id }));
    } catch (error) {
      console.log('Error in handleAddTask: ', error);
    }
  };

  const handleDeleteColumn = async () => {
    const body = {
      columnId: column._id,
      projectId: currentProject._id,
    }

    console.log('body in deletecolumn', body);
    try {
      if (!column._id || !currentProject._id) {
        console.error('Invalid project or column id');
        return;
      }

      const res = await deleteColumnMutation(body);
      console.log('res deletecolumn', res);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteColumn({ columnId: column._id, projectId: currentProject._id }));
    } catch (error) {
      console.log('Error in handleDeleteColumn: ', error);
    }
  };

  return (
    <div className="container" id="tableColumnMain">
      {isOpen ? <TextModal
        placeholder={'Task Name'}
        setterFunction={setTask}
        onClick={(e) => handleAddTask(e)}
        setIsOpen={setIsOpen}
        title='Add Task'
        column={column._id}
        currentProject={currentProject._id}
      /> : null}

      <div id="tableColumnHeader">
        <h2>{column.columnName}</h2>
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          text='Add Task'
        />
        <TaskButton
          onClick={() => handleDeleteColumn(column.columnName)}
          text='Delete'
        />
      </div>
      {column.tasks?.map((task, index) => {
        return <TableTask key={index} task={task} column={column} currentProject={currentProject} />;
      })}
    </div>
  );
};

export default TableColumn;