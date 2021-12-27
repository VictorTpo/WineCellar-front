import React, { useState } from 'react';

import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import FormInvalid from './FormOutputs/FormInvalid';

function SignUp (){
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setFormInvalid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(false)
    setFormSuccess(false)
    setFormInvalid(false)
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
          setFormInvalid(true)
        } else {
          setFormSuccess(true)
        }
      }).catch(error => {
        setServerError(true)
      })
  }

  return(
    <>
      <Header title="Create an account" />
      {formSuccess && <>Your account has been created</>}
      <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
        <input
          id="email"
          type="text"
          placeholder="Email*"
          className="form-control mb-3 mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password*"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="firstName"
          type="text"
          placeholder="First name*"
          className="form-control mb-3"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          id="lastName"
          type="text"
          placeholder="Last name*"
          className="form-control mb-3"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input type="submit" className="btn btn-primary form-control" value="Create account" />
        {serverError && <ServerError />}
        {formInvalid && <FormInvalid />}
      </form>
    </>
  )
}

export default SignUp;
