import React, { useEffect } from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'
import { useParams } from 'react-router-dom';

export default function WineCellarsEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [formName, setFormName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  const wine_cellar_url = `http://localhost:3003/wine_cellars/${id}`

  const initWineCellar = () => {
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
        setCannotFetch(false)
        setFormName(response.name)
      }).catch(error => {
        setCannotFetch(true)
      })
    }

    useEffect(()=> {
      initWineCellar();
    }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
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
        setServerError(false)
        if(!response.ok){
          setFormSuccess(false)
          setformFailure(true)
        } else {
          setformFailure(false)
          setFormSuccess(true)
          setName(formName)
        }
      })
      .catch(error => {
        setFormSuccess(false)
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
