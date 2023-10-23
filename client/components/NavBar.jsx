import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../slices/userSlice.js';
import { userApi, useLogoutUserMutation } from '../utils/userApi.js';

/*
  This component is the navbar. It contains the links to the home, profile, settings, and logout pages.
  And should exist everywhere except the login and signup pages.
*/

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();
  const handleLogout = async (e) => {
    try {
      localStorage.removeItem('isAuth');
      const res = await logout().unwrap();
      console.log('Logout successful');
      userApi.util.resetApiState(undefined);
      dispatch(resetState(undefined));
      navigate('/login');
    } catch (error) {
      console.log('Logout failed with error: ', error);
    }
  }
  return (
    <nav className='NavBar'>
      <h1><a href='https://github.com/Co-Sync/Co-Sync'>Co-Sync</a></h1>
      <ul>
        <li>
          <Link className='routerLink' to='/'>Home</Link>
          <Link className='routerLink' to='/profile'>Profile</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link className='routerLink' to='/settings'>Settings</Link>
          <button className='routerLink' onClick={handleLogout} type='button' >Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
