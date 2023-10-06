import React from 'react';
import TableColumn from './TableColumn.jsx';

const TableDisplay = () => {
  return (
    <div id='tableDisplayOuter' className='container'>
      <div id='tableDisplayInner'>
        <TableColumn />
      </div>
    </div>
  );
}

export default TableDisplay;