
import React, { useState } from 'react';

function SignUp (){
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setFormFailure] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(false)
    setFormSuccess(false)
    setFormFailure(false)
    const url = `${process.env.REACT_APP_DOMAIN}/accounts`
    const body = {
      email: email,
      first_name: firstName,
      last_name: lastName,
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
          setFormSuccess(true)
        }
      }).catch(error => {
        setServerError(true)
      })
  }

  return(
    <>
      <h1>Sign up</h1>
      {serverError && <>Error 500</>}
      {formFailure && <>Form invalid</>}
      {formSuccess && <>Your account has been created</>}
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
        <input
          id="firstName"
          type="text"
          placeholder="firstName*"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          id="lastName"
          type="text"
          placeholder="lastName*"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  )
}

export default SignUp;
