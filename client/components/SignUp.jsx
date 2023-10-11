import React, { useState } from 'react';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// import { useSignupUserMutation } from '../utils/userApi.js';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();
  // const [signUpUserMutation] = useSignupUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    try {
      const body = { password, username };
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (res.status === 200) {
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
            <TextInput placeholder='Username' setterFunction={setUsername} />
            <TextInput placeholder='Password' setterFunction={setPassword} />
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