import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.scss';

import { isLogged } from './utils/session'

import BottlesEdit from './components/BottlesEdit';
import BottlesIndex from './components/BottlesIndex';
import BottlesNew from './components/BottlesNew';
import BottlesShow from './components/BottlesShow';
import HomeLogged from './components/HomeLogged';
import HomeUnlogged from './components/HomeUnlogged';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WineCellarsEdit from './components/WineCellarsEdit';
import WineCellarsIndex from './components/WineCellarsIndex';
import WineCellarsNew from './components/WineCellarsNew';

const HomeSwitch = () => {
  if(isLogged()){
    return <HomeLogged />
  } else {
    return <HomeUnlogged />
  }
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
