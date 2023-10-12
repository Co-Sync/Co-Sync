import React, { useState } from 'react';
import { deleteTask, updateTask, moveTask } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TaskButton from './TaskButton.jsx';
import TextModal from './TextModal.jsx';
import ColumnViewModal from './ColumnViewModal.jsx';
import { useDeleteTaskMutation, useUpdateTaskMutation, useMoveTaskMutation } from '../utils/userApi.js';

const TableTask = ({ task, column, currentProject }) => {
  const [incomingData, setIncomingData] = useState('');
  const [toggleModal, setToggleModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  // const comment = useSelector((state) => state.user.projects[state.user.currentProject]?.columns[task]?.[0]?.taskComment);
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
      projectId: currentProject._id,
      columnId: column._id,
      taskId: task._id,
      taskName: incomingData,
      taskComments: task.taskComments,
    };
    try {
      const res = await updateTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      // Update state in redux store.
      dispatch(updateTask({ updatedTask : res.data, columnId: column._id }));
      // Update isOpen state to close the "edit task" window.
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* create a task - comments
   req.body: a json object with the following fields:
   - projectId
   - columnId
   - taskName
*/
  // const handleAddComment = async (e) => {
  //   e.preventDefault();
  //   const body = {
  //     projectId: currentProject._id,
  //     columnId: column._id,
  //     taskId: task._id,
  //     taskComments: incomingData,
  //   };
  //   try {
  //     const res = await 
  //   } catch (error) {

  //   }
  // }


  //NEEDS FOCUS 
  const handleMoveTask = async (e) =>  {
    e.preventDefault();
    console.log("new id is: ", e.target.value);
    const body = {
      projectId: currentProject._id,
      oldColumnId: column._id,
      newColumnId: e.target.value,
      taskId: task._id,  
    };
    console.log("body is: ", body);

    try {
      const res = await moveTaskMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(moveTask(body));
    } catch (error) {
      console.log(error);
    }
  };

  /* for delete task
   req.params:
   - projectId
   - columnId
   - taskId*/

  const handleDeleteClick = async () => {
    // e.preventDefault();
    const body = {
      taskId: task._id,
      columnId: column._id,
      projectId: currentProject._id,
    };

    console.log('proj', body);
    try {
      if (!currentProject._id || !column._id || !task._id) {
        console.error('Invalid project, column, or task id');
        return;
      }

      const res = await deleteTaskMutation(body);
      console.log('res', res);
      if (res.error) throw new Error(res.error.message);
      dispatch(deleteTask({ columnId: column._id, taskId: task._id, projectId: currentProject._id }));
    } catch (error) {
      console.log('Error in handleDeleteClick: ', error);
    }
  };


  return (
    <div className="container" id="tableTaskMain">
      <p>{task.taskName}</p>
      <div id='tableTaskButtons'>
        <TaskButton
          onClick={() => handleDeleteClick(task.taskName, column.columnName)}
          text='Delete'
          idOverride='innerTaskButton' />
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
          onClick={() => { setIsMoveOpen(!isMoveOpen); }}
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
        {isMoveOpen ? <ColumnViewModal
          setIsOpen={setIsMoveOpen}
          title='Select Column to Move to'
          onClick={handleMoveTask}
          currentProject={currentProject} 
        /> : null}
      </div>
    </div>
  );
};

export default TableTask;
