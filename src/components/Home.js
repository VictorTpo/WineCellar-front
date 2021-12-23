
import React from 'react';

function Home (){
  return(
    <>
      <h1>Bottle manager home</h1>
      {localStorage.getItem("firstName") && <p>Hello {localStorage.getItem("firstName")}</p> }
    </>
  )
}

export default Home;
