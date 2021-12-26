
import React, { useState } from 'react';

function SignIn (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formFailure, setFormFailure] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(false)
    setFormFailure(false)
    const url = `${process.env.REACT_APP_DOMAIN}/sessions`
    const body = {
      email: email,
      password: password
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
          setFormFailure(true)
        } else {
          return response.json()
        }
      }).then(body => {
        const account = {
          id: body.id,
          firstName: body.first_name,
          jwtToken: body.jwt_token
        }
        localStorage.setItem("account", JSON.stringify(account))
        window.location.reload(false)
      })
      .catch(error => {
        setServerError(true)
      })
  }

  return(
    <>
      <h1>Sign in</h1>
      {serverError && <>Error 500</>}
      {formFailure && <>Form invalid</>}
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  )
}

export default SignIn;
