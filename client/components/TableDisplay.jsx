import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import TableHeader from './TableHeader.jsx'
import { useSelector } from 'react-redux';

/*
  This component renders the ScrollBar and TableColumn components.
*/

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
      <TableHeader {...currentProject} />
      <div id='tableDisplayInner'>
        {currentProject.columns.map((column, index) => {
          // the column and columnName must exist to render each column -- or else will be undefined when trying to render the child component 
          if (column && column.columnName) {
            return <TableColumn key={index} column={column} currentProject={currentProject} />;
          }
        })}
      </div>
    </div>
  );
}

export default TableDisplay;