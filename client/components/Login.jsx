import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';
/* import { useSendUserCredsMutation } from '../utils/userApi.js'; */

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /* const [sendUserCredsMutation] = useSendUserCredsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { password, username };
      const { data } = await sendUserCredsMutation(body);

      if (data.status === 200) {
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Login fetch /login: ERROR: ', error);
    }
  }; */

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
        if (res.status === 200) {
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
            <TextInput placeholder='Username' setterFunction={setUsername} />
            <TextInput placeholder='Password' setterFunction={setPassword} />
            <Button onClick={handleSubmit} text='Login' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
