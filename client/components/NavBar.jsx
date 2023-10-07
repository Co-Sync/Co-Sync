import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className='NavBar'>
      <h1>Co-Sync</h1>
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/'>Profile</Link>
      </ul>
      <ul>
        <Link to='/'>Settings</Link>
        <Link to='/login'>Logout</Link>
      </ul>
    </nav>
  )
}

export default NavBar;
