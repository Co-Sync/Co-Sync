import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import { useSelector } from 'react-redux';

const TableDisplay = () => {
  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
  if (!currentProject) {
    return (
      <>
        <div id='tableDisplayOuter' className='container'>
          <ScrollBar currentProject={currentProject} />
          <h1>Please Select A Project</h1>
        </div>
      </>
    );
  }
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar currentProject={currentProject} />
      <div id='tableDisplayInner'>
        {currentProject.columns.map((column, index) => {
          if (column && column.columnName) {
            // console.log(`Rendering TableColumn for column at index ${index}:`, column);
            return <TableColumn key={index} column={column} currentProject={currentProject} />;
          }
        })}
      </div>
    </div>
  );
}

export default TableDisplay;