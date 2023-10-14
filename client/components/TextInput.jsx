import React from 'react';

const TextInput = ({ placeholder, setterFunction, value, type }) => {
  return (
    <div className='TextInputOuter'> {/* change this to a fieldset for the notched outline(UNSTABLE) */}
      <div className='TextField'>
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
      </div>
    </div>
  )
}

export default TextInput;