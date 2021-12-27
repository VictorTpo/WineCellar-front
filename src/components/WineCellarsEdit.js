import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

export default function WineCellarsEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [formName, setFormName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  const wine_cellar_url = `${process.env.REACT_APP_DOMAIN}/wine_cellars/${id}`

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformFailure(false)
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
        setFormName(response.name)
      }).catch(error => {
        resetFormOutput()
        setCannotFetch(true)
      })
    }, [wine_cellar_url])

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = {
      name: formName
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
          setformFailure(true)
        } else {
          setFormSuccess(true)
          setName(formName)
        }
      })
      .catch(error => {
        resetFormOutput()
        if(!formFailure) { setServerError(true) }
      })
  }

  const SuccessPopin = () => {
    return <>Your wine cellar {name} has been saved</>
  }

  const TryLater = () => {
    return <span>Plz, try later</span>
  }

  return(
    <>
      <h1>Edit a wine cellar</h1>
      {serverError && <>Error 500</>}
      {formSuccess && <SuccessPopin />}
      {formFailure && <>The form is not valid</>}
      {cannotFetch ? <TryLater /> : <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="name*"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input type="submit" />
      </form>
     }
    </>
  );
}
