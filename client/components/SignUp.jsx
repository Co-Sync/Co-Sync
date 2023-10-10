import React, { useState } from 'react';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    try {
      const body = { email, password, username };
      const res = await fetch('/signup', {
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
        <div className='login'>
          <form className='formContainer'>
            <TextInput placeholder='Username' onChange={setUsername} />
            <TextInput placeholder='Email' onChange={setEmail} />
            <TextInput placeholder='Password' onChange={setPassword} />
            <Button onClick={handleSubmit} text='Sign Up' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;