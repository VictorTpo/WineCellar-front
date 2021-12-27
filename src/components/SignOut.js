
import React from 'react';

function SignOut (){
  const killSesssion = () => {
    localStorage.removeItem("account")
    window.location.reload(false)
  }

  return(
    <button onClick={killSesssion}>Sign out</button>
  )
}

export default SignOut;
