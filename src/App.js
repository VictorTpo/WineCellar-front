import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.scss';

import BottlesEdit from './components/BottlesEdit';
import BottlesIndex from './components/BottlesIndex';
import BottlesNew from './components/BottlesNew';
import BottlesShow from './components/BottlesShow';
import Home from './components/Home';
import HomeUnlogged from './components/HomeUnlogged';
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import SignUp from './components/SignUp'
import WineCellarsEdit from './components/WineCellarsEdit';
import WineCellarsIndex from './components/WineCellarsIndex';
import WineCellarsNew from './components/WineCellarsNew';

function loggedIn() {
  return(localStorage.getItem("account") != null)
}

const LoggedMenu = () => {
    return(
      <ul>
        <li><Link to="/wine_cellars">My wine cellars</Link></li>
        <li><Link to="/wine_cellars/new">New wine cellar</Link></li>
        <li><Link to="/bottles">My bottles</Link></li>
        <li><Link to="/bottles/new">New bottle</Link></li>
        <li><SignOut /></li>
      </ul>
    )
}

const HomeSwitch = () => {
  if(loggedIn()){
    return <LoggedMenu />
  } else {
    return <HomeUnlogged />
  }
  // { !loggedIn() ? <HomeUnlogged /> : <LoggedMenu /> }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={HomeSwitch()}></Route>
        <Route exact path='/bottles' element={< BottlesIndex />}></Route>
        <Route exact path='/bottles/new' element={< BottlesNew />}></Route>
        <Route exact path='/bottles/:id' element={< BottlesShow />}></Route>
        <Route exact path='/bottles/:id/edit' element={< BottlesEdit />}></Route>
        <Route exact path='/sign-in' element={< SignIn />}></Route>
        <Route exact path='/sign-up' element={< SignUp />}></Route>
        <Route exact path='/wine_cellars' element={< WineCellarsIndex />}></Route>
        <Route exact path='/wine_cellars/new' element={< WineCellarsNew />}></Route>
        <Route exact path='/wine_cellars/:id/edit' element={< WineCellarsEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
