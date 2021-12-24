
import React from 'react';
import { currentAccountFirstName } from '../utils/currentAccount'

function Home (){
  return(
    <>
      <h1>Bottle manager home</h1>
      {localStorage.getItem("account") && <p>Hello {currentAccountFirstName()}</p> }
    </>
  )
}

export default Home;
