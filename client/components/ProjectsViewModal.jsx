import React from 'react';
import { useSelector } from 'react-redux';

/*
  This component renders the ProjectsViewModal component, view meaning no text input field.
*/

const ProjectsViewModal = ({ setIsOpen, title, saveFunc }) => {
  const projects = useSelector(state => state.user.projects);
  const projectsList = Object.keys(projects).map(project => project);
  return (
    <div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(prev => !prev)
            }} 
            className='closeModalButton'>x</button>
        </div>
        <div className='projectsList'>          
          {projectsList.map((project, index) => {
            return <button value={project} onClick={(e) => {
              e.preventDefault();
              setIsOpen(prev => !prev);
              saveFunc(e);
            }} className='projectsListButton' key={index}>{index} - {project}</button>
          })}
        </div>
      </form>
    </div>
  );
}

export default ProjectsViewModal;