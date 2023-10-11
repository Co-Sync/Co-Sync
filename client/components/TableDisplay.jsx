import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import { useSelector } from 'react-redux';

const TableDisplay = (props) => {
  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
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