import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../slices/userSlice.js';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.error) throw new Error(res.error.message);
      if (res.status === 200) {
        dispatch(resetState());
        navigate('/login');
      } else {
        throw new Error('Something went wrong while logging out');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className='NavBar'>
      <h1><a href='https://github.com/Co-Sync/Co-Sync'>Co-Sync</a></h1>
      <ul>
        <Link className='routerLink' to='/'>Home</Link>
        <Link className='routerLink' to='/'>Profile</Link>
      </ul>
      <ul>
        <Link className='routerLink' to='/'>Settings</Link>
        <button className='routerLink' onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  )
}

export default NavBar;
