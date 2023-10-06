import React from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';

const Home = () => {
  return (
    <div className='homeMain'>
      <NavBar />
      <TableDisplay />
    </div>
  );
}

export default Home;