import React from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'

export default function WineCellarsNew() {
  const [formName, setFormName] = useState("");
  const [name, setName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformFailure(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_DOMAIN}/wine_cellars`
    const body = {
      name: formName
    }
    const query = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      },
      body: JSON.stringify(body)
    };

    fetch(url, query)
      .then(response => {
        resetFormOutput()
        if(!response.ok){
          setformFailure(true)
        } else {
          return response.json()
        }
      })
      .then(body => {
        if(body){
          setFormSuccess(true)
          setName(body.name)
          setFormName('')
        }
      }).catch(error => {
        if(!formFailure) {
          resetFormOutput()
          setServerError(true)
        }
      })
  }

  const SuccessPopin = () => {
    return <>Your wine cellar {name} has been created</>
  }

  return(
    <>
      <h1>New Wine Cellar</h1>
      {serverError && <>Error 500</>}
      {formSuccess && <SuccessPopin />}
      {formFailure && <>The form is not valid</>}
      <form onSubmit={handleSubmit}>
      <input
          id="formName"
          type="text"
          placeholder="name*"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}
