import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <h1>Co-Sync</h1>
      <ul>
        <Link className='routerLink' to='/'>Home</Link>
        <Link className='routerLink' to='/'>Profile</Link>
      </ul>
      <ul>
        <Link className='routerLink' to='/'>Settings</Link>
        <Link className='routerLink' to='/login'>Logout</Link>
      </ul>
    </nav>
  )
}

export default NavBar;
