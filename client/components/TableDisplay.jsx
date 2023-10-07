import React from 'react';
import TableColumn from './TableColumn.jsx';
import ScrollBar from './ScrollBar.jsx';

const TableDisplay = () => {
  return (
    <div id='tableDisplayOuter' className='container'>
      <ScrollBar />
      <div id='tableDisplayInner'>
        <TableColumn />
        <TableColumn />
      </div>
    </div>
  );
}

export default TableDisplay;