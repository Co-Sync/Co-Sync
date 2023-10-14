import React from 'react';

const TextInput = ({ placeholder, setterFunction, value, type }) => {
  return (
    <div className='TextInputOuter'>
      <fieldset className='TextField'>
        <input
          className='TextInput'
          type={type ? type : 'text'}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            setterFunction(e.target.value)
          }}
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