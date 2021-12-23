import React from 'react';
import GoogleLogout from 'react-google-login';

const clientId = '941850839469-71hp7voteve2781u4q3651fges6mt86g.apps.googleusercontent.com'

function Logout (){
  const onSuccess = (response) => {
    console.log('onSuccess')
    localStorage.removeItem("firstName")
    window.location.reload(false)
  }

  return(
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onSuccess={onSuccess}
      ></GoogleLogout>
    </>
  )
}

export default Logout;
