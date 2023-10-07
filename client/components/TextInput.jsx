import React from 'react';

const TextInput = ({ placeholder, onChange, value }) => {
  const legendWidth = `${placeholder.length * 0.32}em`;
  return (
    <div className='TextInputOuter'>
      <fieldset className='TextField' style={{ '--legend-width': legendWidth }}>
        <input
          className='TextInput'
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=''
        />
        <legend></legend>
        <span className={'TextInputHighlight'}>{ placeholder }</span>
      </fieldset>
    </div>
  )
}

export default TextInput;