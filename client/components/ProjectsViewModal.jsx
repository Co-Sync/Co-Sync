import React from 'react';
import { useSelector } from 'react-redux';

const ProjectsViewModal = ({ setIsOpen, title }) => {
  const projects = useSelector(state => state.user.projects);
  const projectsList = Object.keys(projects).map(project => project);
  console.log(projectsList)
  return (
    <div id='modal' className='textModalVisible'>
      <form className='textModalInner'>
        <div className='textModalHeader'>
          <p>{title}</p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              console.log(setIsOpen)
              setIsOpen(prev => !prev)
            }} 
            className='closeModalButton'>x</button>
        </div>
        <div className='projectsList'>          
          { projectsList.map((project, index) => {
            return <button className='projectsListButton' key={index}>{project}</button>
          })}
        </div>
      </form>
    </div>
  )
}

export default ProjectsViewModal;