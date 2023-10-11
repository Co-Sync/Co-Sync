import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import { useSelector } from 'react-redux';

const TableDisplay = () => {
  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
  if (!currentProject) {
    return (
      <>
        <ScrollBar currentProject={currentProject} />
        <div >Please Select A Project</div>
      </>
    );
  }
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar currentProject={currentProject} />
      <div id='tableDisplayInner'>
        {currentProject.columns.map((column, index) => {
          return <TableColumn key={index} column={column} currentProject={currentProject} />;
        })}
      </div>
    </div>
  );
}

export default TableDisplay;