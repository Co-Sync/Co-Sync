import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login clicked');
    const data = { username, password };
    setTimeout(() => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }).then(res => {
        if(res.status === 200) {
          navigate('/');
        } else {
          console.log('Login failed');
        }
      }).catch(err => {
        console.log('Login failed with error: ', err);
      });
    }, 1000);
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
            <TextInput placeholder='Username' onChange={ setUsername } />
            <TextInput placeholder='Password' onChange={ setPassword } />
            <Button onClick={ handleSubmit } text='Login' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
