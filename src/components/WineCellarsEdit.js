import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

import FormInvalid from './FormOutputs/FormInvalid';
import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import Success from './Alerts/Success';
import Warning from './Alerts/Warning';

export default function WineCellarsEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setformInvalid] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  const wine_cellar_url = `${process.env.REACT_APP_DOMAIN}/wine_cellars/${id}`

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformInvalid(false)
    setCannotFetch(false)
  }

  useEffect(()=> {
    const query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(wine_cellar_url, query)
      .then(response => response.json())
      .then(response => {
        resetFormOutput()
        setName(response.name)
      }).catch(error => {
        resetFormOutput()
        setCannotFetch(true)
      })
    }, [wine_cellar_url])

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = {
      name: name
    }
    const query = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      },
      body: JSON.stringify(body)
    };

    fetch(wine_cellar_url, query)
      .then(response => {
        resetFormOutput()
        if(!response.ok){
          setformInvalid(true)
        } else {
          setFormSuccess(true)
        }
      })
      .catch(error => {
        resetFormOutput()
        if(!formInvalid) { setServerError(true) }
      })
  }

  return(
    <>
      <Header title="Edit wine cellar" />
      <div className="container">
        {cannotFetch ? <Warning text="Server Error, please try later" /> : <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
          <input
            id="name"
            type="text"
            placeholder="name*"
            className="form-control mb-3 mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" className="btn btn-primary form-control" value="Update" />
          {serverError && <ServerError />}
          {formInvalid && <FormInvalid />}
          {formSuccess && <Success text="Wine cellar updated"/>}
        </form>
      }
     </div>
    </>
  );
}
