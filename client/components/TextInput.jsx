import React from 'react';

const TextInput = ({ placeholder, onChange, value }) => {
  return (
    <div className='TextInputOuter'>
      <fieldset className='TextField'>
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