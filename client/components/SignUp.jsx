import React, { useState } from 'react';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserName } from '../slices/userSlice.js';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = username;
    const body = { password, username };
    setUsername('');
    setPassword('');
    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (res.status === 200) {
        dispatch(setUserName(user));
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('SignUp fetch /signup: ERROR: ', error);
    }
  };

  return (
    <div className='outerContainer'>
      <div className="login container">
        <div className='header'>
          <h1>Co-Sync</h1>
          <h2>Sign Up</h2>
        </div>
        <div className='innerLogin'>
          <form className='formContainer'>
            <TextInput placeholder='Username' setterFunction={setUsername} value={username} />
            <TextInput placeholder='Password' setterFunction={setPassword} value={password} />
            <Button onClick={handleSubmit} text='Sign Up' />
          </form>
          <div className='footer'>
            <div>
              <p>Already have an account?</p>
              <Link to='/login'>Login</Link>
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

export default SignUp;