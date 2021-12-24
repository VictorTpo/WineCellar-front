import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import BottleFormNew from './components/BottleFormNew';
import WineCellarFormNew from './components/WineCellarFormNew';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';

function loggedIn() {
  return(localStorage.getItem("account") != null)
}

const LoggedMenu = () => {
  if(!loggedIn()) {
    return <li><Login /></li>
  } else {
    return(
      <>
        <li><Link to="/wine_cellars/new">New wine cellar</Link></li>
        <li><Link to="/bottles/new">New bottle</Link></li>
        <li><Logout /></li>
      </>
    )
  }
}


function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <LoggedMenu />
        </ul>
      </nav>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/wine_cellars/new' element={< WineCellarFormNew />}></Route>
        <Route exact path='/bottles/new' element={< BottleFormNew />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
