import React, { useState } from 'react';

import { queryBuilder } from '../utils/fetchUtils'

import FormInvalid from './FormOutputs/FormInvalid';
import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import Success from './Alerts/Success';

export default function WineCellarsNew() {
  const [formName, setFormName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setFormInvalid] = useState(false)

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setFormInvalid(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    resetFormOutput()

    const body = {
      name: formName
    }

    fetch(`${process.env.REACT_APP_DOMAIN}/wine_cellars`, queryBuilder('POST', body))
      .then(response => {
        if(!response.ok){
          setFormInvalid(true)
        } else {
          return response.json()
        }
      })
      .then(body => {
        if(body){
          setFormSuccess(true)
          setFormName('')
        }
      }).catch(error => {
        if(!formInvalid) {
          resetFormOutput()
          setServerError(true)
        }
      })
  }

  return(
    <>
      <Header title="New wine cellar" />
      <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
      <input
          id="formName"
          type="text"
          placeholder="name*"
          className="form-control mb-3 mt-3"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input type="submit" className="btn btn-primary form-control" value="Create" />
        {serverError && <ServerError />}
        {formInvalid && <FormInvalid />}
        {formSuccess && <Success text="Wine cellar created"/>}
      </form>
    </>
  );
}
