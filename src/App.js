import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import BottleFormNew from './components/BottleFormNew';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';

const LoginStuff = () => {
  if(localStorage.getItem("firstName")){
    return <Logout />
  } else {
    return <Login />
  }
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bottles/new">New bottle</Link></li>
          <li><LoginStuff /></li>
        </ul>
      </nav>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/bottles/new' element={< BottleFormNew />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
