import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';
import { useSelector } from 'react-redux';

const TableDisplay = () => {
  const currentProject = useSelector((state) => state.user.projects[state.user.currentProject]);
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar />
      <div id='tableDisplayInner'>
        {currentProject.columns.map((column, index) => {
          return <TableColumn key={index} column={column} />;
        })}
      </div>
    </div>
  );
}

export default TableDisplay;