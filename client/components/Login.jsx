import React, { useState } from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';
import { useNavigate, Link } from 'react-router-dom';
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
    const data = { username, password };
    setTimeout(() => {
      fetch('/api/user/login', {
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
        <div className='innerLogin'>
          <form className='formContainer'>
            <TextInput placeholder='Username' setterFunction={setUsername} />
            <TextInput placeholder='Password' setterFunction={setPassword} type='password'/>
            <Button onClick={handleSubmit} text='Login' />
          </form>
          <div className='footer'>
            <div>
              <p>Don&apos;t have an account?</p>
              <Link to='/signup'>Sign Up</Link>
            </div>
            <div>
              <a href='https://github.com/Co-Sync/Co-Sync'>Checkout the project</a>
            </div>
            <div>
              <p>
                Forgot your password?
              </p>
              <Link to='/reset'>Reset Password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
