import React from 'react';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'
import Settings from './components/Settings.jsx';
import Profile from './components/Profile.jsx';
import { Route, Routes } from 'react-router-dom';
import './css/index.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="/settings" Component={Settings}></Route>
        <Route exact path="/profile" Component={Profile}></Route>
        <Route exact path="/login" Component={Login}></Route>
        <Route exact path="/signup" Component={SignUp}></Route>
      </Routes>
    </div>
  );
}

export default App;