import React, { useState } from 'react';

import { queryBuilder } from '../utils/fetchUtils'

import Header from './Header';
import FormInvalid from './FormOutputs/FormInvalid';
import ServerError from './FormOutputs/ServerError';

function SignIn (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formInvalid, setFormInvalid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(false)
    setFormInvalid(false)

    const body = {
      email: email,
      password: password
    }

    fetch(`${process.env.REACT_APP_DOMAIN}/sessions`, queryBuilder('POST', body))
      .then(response => {
        if(!response.ok){
          setFormInvalid(true)
        } else {
          return response.json()
        }
      }).then(body => {
        if(!body) { return }
        const account = {
          id: body.id,
          firstName: body.first_name,
        }
        localStorage.setItem("account", JSON.stringify(account))
        localStorage.setItem("token", body.jwt_token)
        window.location.href = '/'
      })
      .catch(error => {
        setFormInvalid(false)
        setServerError(true)
      })
  }

  return(
    <>
      <Header title="Login" />
      <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
        <input
          id="email"
          type="text"
          placeholder="email*"
          className="form-control mb-3 mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="password*"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="btn btn-primary form-control" value="Login" />
        {serverError && <ServerError />}
        {formInvalid && <FormInvalid />}
      </form>
    </>
  )
}

export default SignIn;
