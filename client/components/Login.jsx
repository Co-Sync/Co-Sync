import React from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';

const Login = () => {
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
            {/* <TextInput placeholder='Password' /> */}

            <button className='loginButton'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
