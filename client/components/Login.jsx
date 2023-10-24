import React, { useEffect, useState } from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };
    setUsername('');
    setPassword('');
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then((err) => {
            return toast({
              title: 'Error',
              description: `${err.err}`,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          })
        }
        localStorage.setItem('isAuth', true);
        console.log('received data from login', data);
        setAuthenticated(true);
      })
      .catch(err => {
        console.log('Login failed with error: ', err);
      });
  };
  return (
    <div className='outerContainer'>
      <div className="login container">
        <div className='header'>
          <h1>Co-Sync</h1>
          <h2>Project Management</h2>
        </div>
        <div className='headerSecondary'>
          <h1>Login</h1>
        </div>
        <hr />
        <div className='innerLogin'>
          <div className='outerForm'>
            <form className='formContainer'>
              <TextInput placeholder='Username' setterFunction={setUsername} value={username} />
              <TextInput placeholder='Password' setterFunction={setPassword} type='password' value={password}/>
              <Button saveFunc={handleSubmit} text='Login' />
            </form>
          </div>
          <div className='footer'>
            <hr />
            <div className='innerFooter'>
              <div>
                <p>Don&apos;t have an account?</p>
                <Link to='/signup'>Sign Up</Link>
              </div>
              <div>
                <p>Checkout the project</p>
                <a href='https://github.com/Co-Sync/Co-Sync'>Here</a>
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
    </div>
  );
};
export default Login;
