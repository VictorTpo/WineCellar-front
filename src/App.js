import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import BottleFormNew from './components/BottleFormNew';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bottles/new">New bottle</Link></li>
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
