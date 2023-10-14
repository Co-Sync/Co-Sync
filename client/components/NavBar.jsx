import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../slices/userSlice.js';
import { userApi } from '../utils/userApi.js';

/*
  This component is the navbar. It contains the links to the home, profile, settings, and logout pages.
  And should exist everywhere except the login and signup pages.
*/

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 200) {
        console.log('Logout successful');
        userApi.util.resetApiState();
        localStorage.removeItem('isAuth');
        navigate('/login');
        dispatch(resetState());
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.log('Logout failed with error: ', error);
    }
  }
  return (
    <nav className='NavBar'>
      <h1><a href='https://github.com/Co-Sync/Co-Sync'>Co-Sync</a></h1>
      <ul>
        <Link className='routerLink' to='/'>Home</Link>
        <Link className='routerLink' to='/profile'>Profile</Link>
      </ul>
      <ul>
        <Link className='routerLink' to='/settings'>Settings</Link>
        <button className='routerLink' onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  )
}

export default NavBar;
