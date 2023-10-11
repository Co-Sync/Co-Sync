import React from 'react';

const TextInput = ({ placeholder, setterFunction, value }) => {
  return (
    <div className='TextInputOuter'>
      <fieldset className='TextField'>
        <input
          className='TextInput'
          type="text"
          value={value}
          onChange={(e) => setterFunction(e.target.value)}
          placeholder=''
        />
        <legend>
          <span>
            {placeholder}
          </span>
        </legend>
        <span className={'TextInputHighlight'}>
          { placeholder }
        </span>
      </fieldset>
    </div>
  )
}

export default TextInput;