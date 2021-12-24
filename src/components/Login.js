import React from 'react';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '941850839469-71hp7voteve2781u4q3651fges6mt86g.apps.googleusercontent.com'

function createAccount(googleAccount) {
  const url = 'http://localhost:3003/accounts'
  const body = {
    first_name: googleAccount.givenName,
    last_name: googleAccount.familyName,
    google_id: googleAccount.googleId,
    email: googleAccount.email,
  }
  const query = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  fetch(url, query)
    .then(response => {
      if(!response.ok){
        // todo
      } else {
        return response.json()
      }
    })
    .then(body => {
      const account = {
        id: body.id,
        firstName: body.first_name,
      }
      localStorage.setItem("account", JSON.stringify(account))
      window.location.reload(false)
    }).catch(error => {
      // todo
    })
}

function Login() {
  const onSuccess = (response) => {
    createAccount(response.profileObj)
    refreshTokenSetup(response)
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
