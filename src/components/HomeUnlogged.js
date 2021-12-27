
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function HomeUnlogged (){
  return(
    <>
      <Header noBackBtn={true} />
      <div className="card bg-light border-light text-center container unlogged-menu">
        <nav className="">
          <div className="row mb-3">
            <Link className="col-8 offset-2 btn btn-outline-primary" to="/sign-in">Sign in</Link>
          </div>
          <div className="row mb-3">
            <Link className="col-8 offset-2 btn btn-outline-primary" to="/sign-up">Sign up</Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default HomeUnlogged;
