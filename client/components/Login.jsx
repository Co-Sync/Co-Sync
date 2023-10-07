import React from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login clicked');
  };

  return (
    <div className='outerContainer'>
      <div className="login container">
        <div className='header'>
          <h1>Co-Sync</h1>
          <h2>Login</h2>
        </div>
        <div className='login'>
          <form className='formContainer'>
            <TextInput placeholder='Username' />
            <TextInput placeholder='Password' />
            <Button onClick={ handleSubmit } text='Login' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
