import React from 'react';

function SignOut (){
  const killSesssion = () => {
    localStorage.removeItem("account")
    window.location.reload(false)
  }

  return(
    <button
      className="col-8 btn btn-outline-primary"
      onClick={killSesssion}
      >Sign out</button>

  )
}

export default SignOut;
