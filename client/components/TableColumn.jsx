import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableTask from './TableTask.jsx';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import { deleteColumn, createTask } from '../slices/userSlice.js';
import { useDeleteColumnMutation, useAddTaskMutation } from '../utils/userApi.js';

/*
  This component renders the individual columns in the table.
  It also renders the TableTask components, and is responsible for dispatching the actions column actions
  to the redux store.
*/

// the functionality heres operates similarly to TableTask.jsx of using mutations from userApi.jsx, textmodals, and taskbuttons
const TableColumn = ({ column, currentProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState('');
  // must call mutations in a destructered array to then call later 
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const [addTaskMutation] = useAddTaskMutation();
  const dispatch = useDispatch();

  // console.log(currentProject)
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

  // for return statement, we use conditional rendering for the components and pass in their actions created in this component for textmodal and taskbutton
  return (
    <div className="container" id="tableColumnMain">
      {isOpen ? <TextModal
        placeholder={'Task Name'}
        setterFunction={setTask}
        saveFunc={(e) => handleAddTask(e)}
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
      {column.tasks.length ? column.tasks.map((task, index) => {
        return <TableTask index={index} key={index} task={task} column={column} currentProject={currentProject} />;
      }) : <h1>No Tasks Yet</h1>}
    </div>
  );
};

export default TableColumn;