import React from 'react';

const TextInput = ({ placeholder, onChange, value }) => {
  return (
    <div className='TextInputOuter'>
      <fieldset className='TextField'>
        <legend></legend>
        <input
          className='TextInput'
          type="text"
          value={value}
          onChange={onChange}
        />
      </fieldset>
      <span className={'TextInputHighlight'}>{ placeholder }</span>
    </div>
  )
}

export default TextInput;