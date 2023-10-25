import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../slices/userSlice.js';
import { userApi, useLogoutUserMutation } from '../utils/userApi.js';
import { useGetNotificationsQuery } from '../utils/userApi.js';
// import { BellIcon } from '@chakra-ui/icons'

// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverHeader,
//   PopoverBody,
//   PopoverFooter,
//   PopoverArrow,
//   PopoverCloseButton,
//   PopoverAnchor,
// } from '@chakra-ui/react'

import NotificationPopover from './NotificationsPopover.jsx';
import ProfilePopover from './ProfilePopover.jsx';
/*
  This component is the navbar. It contains the links to the home, profile, settings, and logout pages.
  And should exist everywhere except the login and signup pages.
*/

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();
  const isAuth = localStorage.getItem('isAuth');
  const { data: notifications, isError: isNotificationsError, isLoading: isNotificationsLoading, isSuccess: isNotificationsSuccess, error: notificationsError } = useGetNotificationsQuery({ skip: !isAuth });
  
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
          <NotificationPopover notifications={notifications} />
          <ProfilePopover />
          {/* <Link className='routerLink' to='/settings'>Settings</Link> */}
          {/* <button className='routerLink' onClick={handleLogout} type='button' >Logout</button> */}
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
