import React from 'react';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/" Component={Home}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;