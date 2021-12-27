import React from 'react';
import { Link } from 'react-router-dom';

import { currentAccountFirstName } from '../utils/currentAccount'

import Header from './Header';
import SignOut from './SignOut'

import imgPlus from '../assets/images/icons/plus.png';

function HomeLogged (){
  return(
    <>
      <Header noBackBtn={true} />
      <div className="card bg-light border-light text-center container">
        <p>Hello {currentAccountFirstName()}</p>
        <nav>
          <div className="row mb-5 mx-2">
            <h3 className="text-start">My wine cellars</h3>
            <Link className="col-7 btn btn-outline-primary" to="/wine_cellars">List them</Link>
            <Link className="col-2 offset-1 btn btn-outline-primary" to="/wine_cellars/new">
              <img src={imgPlus} alt="add a new wine cellar" width="40px" />
            </Link>
          </div>

          <div className="row mb-5 mx-2">
            <h3 className="text-start">My bottles</h3>
            <Link className="col-7 btn btn-outline-primary" to="/bottles">List them</Link>
            <Link className="col-2 offset-1 btn btn-outline-primary" to="/bottles/new">
              <img src={imgPlus} alt="add a new bottle" width="40px" />
            </Link>
          </div>

          <div className="mt-5">
            <SignOut />
          </div>
        </nav>
      </div>
    </>
  )
}

export default HomeLogged;
