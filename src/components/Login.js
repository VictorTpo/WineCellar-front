import React from 'react';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '941850839469-71hp7voteve2781u4q3651fges6mt86g.apps.googleusercontent.com'

function Login (){
  const onSuccess = (response) => {
    localStorage.setItem("firstName", response.profileObj.givenName)
    refreshTokenSetup(response)
    window.location.reload(false)
  }

  const onFailure = (response) => {
    // todo
  }

  return(
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
      />
    </>
  )
}

export default Login;
