import React from 'react';

function SignOut (){
  const killSesssion = () => {
    localStorage.removeItem("account")
    localStorage.removeItem("token")
    window.location.href = '/'
  }

  return(
    <button
      className="col-8 btn btn-outline-primary mb-5"
      onClick={killSesssion}
      >Sign out</button>

  )
}

export default SignOut;
