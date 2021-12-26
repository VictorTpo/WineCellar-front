import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import BottlesEdit from './components/BottlesEdit';
import BottlesIndex from './components/BottlesIndex';
import BottlesNew from './components/BottlesNew';
import BottlesShow from './components/BottlesShow';
import Home from './components/Home';
import Signup from './components/SignUp'
import WineCellarsEdit from './components/WineCellarsEdit';
import WineCellarsIndex from './components/WineCellarsIndex';
import WineCellarsNew from './components/WineCellarsNew';

function loggedIn() {
  return(localStorage.getItem("account") != null)
}

const LoggedMenu = () => {
  if(!loggedIn()) {
    return(
      <>
        <li>Login</li>
        <li><Link to="/signup">Sign up</Link></li>
      </>
    )
  } else {
    return(
      <>
        <li><Link to="/wine_cellars">My wine cellars</Link></li>
        <li><Link to="/wine_cellars/new">New wine cellar</Link></li>
        <li><Link to="/bottles">My bottles</Link></li>
        <li><Link to="/bottles/new">New bottle</Link></li>
        <li>Logout</li>
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
        <Route exact path='/bottles' element={< BottlesIndex />}></Route>
        <Route exact path='/bottles/new' element={< BottlesNew />}></Route>
        <Route exact path='/bottles/:id' element={< BottlesShow />}></Route>
        <Route exact path='/bottles/:id/edit' element={< BottlesEdit />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/wine_cellars' element={< WineCellarsIndex />}></Route>
        <Route exact path='/wine_cellars/new' element={< WineCellarsNew />}></Route>
        <Route exact path='/wine_cellars/:id/edit' element={< WineCellarsEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
