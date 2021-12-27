import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Header from './Header';
import FormInvalid from './FormOutputs/FormInvalid';
import ServerError from './FormOutputs/ServerError';

function SignIn (){
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formInvalid, setFormInvalid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(false)
    setFormInvalid(false)
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
          setFormInvalid(true)
        } else {
          return response.json()
        }
      }).then(body => {
        if(!body) { return }
        const account = {
          id: body.id,
          firstName: body.first_name,
          jwtToken: body.jwt_token
        }
        localStorage.setItem("account", JSON.stringify(account))
        navigate("/")
        window.location.reload(false)
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
