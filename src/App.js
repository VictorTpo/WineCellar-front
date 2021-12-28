import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';

import { sessionIsLogged } from './utils/session'

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
  if(sessionIsLogged()){
    return <HomeLogged />
  } else {
    return <HomeUnlogged />
  }
}

function PrivateRoute({ children }) {
  const auth = sessionIsLogged()
  return auth ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={HomeSwitch()}></Route>
        <Route exact path='/sign-in' element={< SignIn />}></Route>
        <Route exact path='/sign-up' element={< SignUp />}></Route>

        <Route
          path="/bottles"
          element={<PrivateRoute><BottlesIndex /></PrivateRoute>}
        />
        <Route
          path="/bottles/new"
          element={<PrivateRoute><BottlesNew /></PrivateRoute>}
        />
        <Route
          path="/bottles/:id"
          element={<PrivateRoute><BottlesShow /></PrivateRoute>}
        />
        <Route
          path="/bottles/:id/edit"
          element={<PrivateRoute><BottlesEdit /></PrivateRoute>}
        />
        <Route
          path="/wine_cellars"
          element={<PrivateRoute><WineCellarsIndex /></PrivateRoute>}
        />
        <Route
          path="/wine_cellars/new"
          element={<PrivateRoute><WineCellarsNew /></PrivateRoute>}
        />
        <Route
          path="/wine_cellars/:id/edit"
          element={<PrivateRoute><WineCellarsEdit /></PrivateRoute>}
        />

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
