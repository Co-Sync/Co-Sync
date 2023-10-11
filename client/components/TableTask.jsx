import React, { useState } from 'react';
import { deleteTask, updateTask, moveTask } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import { useDeleteTaskMutation, useUpdateTaskMutation, useMoveTaskMutation } from '../utils/userApi.js';

const TableTask = ({ task, column, currentProject }) => {
  //instead of task, might need to pass down props to access props.task.taskId / props.projects.projectId
  const [incomingData, setIncomingData] = useState('');
  const [toggleModal, setToggleModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [moveTaskMutation] = useMoveTaskMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  //NEEDS FOCUS
  const handleEditClick = async (e) => {
    e.preventDefault();
    const body = {
      incomingData,
    };
    try {
      const res = await updateTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(updateTask(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  //NEEDS FOCUS 
  const handleMoveTask = async (columnName, taskToMove, newColumn) => {
    // e.preventDefault();
    const body = {
      columnName,
      taskToMove,
      newColumn
    };

    try {
      const res = await moveTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(moveTask(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  /* for delete task
   req.params:
   - projectId
   - columnId
   - taskId*/

  //NEEDS THE ACCESS OF PARAMS 
  const handleDeleteClick = async () => {
    // e.preventDefault();
    const body = {
      taskId: task._id,
      columnId: column._id,
      projectId: currentProject._id,
      taskName: task.taskName
    };
    try {
      const res = await deleteTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteTask(res.data));
    } catch (error) {
      console.log(error);
    }

    //getting back undefined: http://localhost:8080/api/project/task/undefined/undefined/undefined

    // console.log('Deleting task:', task.taskName);
    // console.log('Find column', column.columnName);
    // dispatch(deleteTask(task.taskName, column.columnName));
    // console.log('clicked');
  };


  return (
    <div className="container" id="tableTaskMain">
      <p>{task.taskName}</p>
      <div id='tableTaskButtons'>
        <TaskButton
          onClick={() => handleDeleteClick(task.taskName, column.columnName)}
          text='Delete'
          idOverride='innerTaskButton' />
        {/* <TaskButton
          onClick={() => setToggleModal(!toggleModal)}
          text='Edit'
          idOverride='innerTaskButton'
        /> */}
        <TaskButton
          onClick={(e) => handleInputChange(e)}
          text='Edit'
          idOverride='innerTaskButton'
        />
        <TaskButton
          onClick={() => setToggleModal(!toggleModal)}
          text='Comment'
          idOverride='innerTaskButton'
        />
        <TaskButton
          onClick={() => handleMoveTask()}
          text='Move'
          idOverride='innerTaskButton'
        />
        {isOpen ? <TextModal
          placeholder={'Task Name'}
          setterFunction={setIncomingData}
          onClick={(e) => handleEditClick(e)}
          setIsOpen={setIsOpen}
          title='Edit Task'
        /> : null}
      </div>
    </div>
  );
};

export default TableTask;
