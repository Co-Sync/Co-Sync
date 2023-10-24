import React, { useEffect, useState } from 'react';
import TextInput from './TextInput.jsx';
import '../css/Login.scss';
import Button from './Button.jsx';
import { useSendUserCredsMutation } from '../utils/userApi.js';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const Login = () => {
  const [sendUserCreds] = useSendUserCredsMutation();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {username, password};
    setUsername('');
    setPassword('');
    try {
      const prom = sendUserCreds(data).unwrap()
      toast.promise(prom, {
        success: {
          title: 'Success',
          description: 'Promise Resolved Description',
          isClosable: true,
          duration: 3000
        },
        error: {
          title: 'Authentication Failed',
          description: 'Incorrect Username or Password',
          isClosable: true,
          duration: 3000
        },
        loading: {
          title: 'Loading',
          description: 'Searching for Username and Password',
          isClosable: true,
          duration: 3000
        }
      })
      await prom; // needed await down here for toast notification to work
      localStorage.setItem('isAuth', true);
      setAuthenticated(true);
      
    } catch (err) {
      console.log('Unable to login:', err.data.err);
    }
  }
  
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
              <Button 
                saveFunc={handleSubmit} 
                text='Login' 
              />
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
