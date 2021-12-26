import React, { useEffect } from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'
import { useParams } from 'react-router-dom';

export default function BottlesEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [wineCellarId, setWineCellarId] = useState("");
  const [wineCellars, setWineCellars] = useState([]);
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  const bottle_url = `http://localhost:3003/bottles/${id}`

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformFailure(false)
    setCannotFetch(false)
  }

  useEffect(()=> {
    const url = 'http://localhost:3003/wine_cellars'
    const wine_cellar_query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(url, wine_cellar_query)
      .then(response => response.json())
      .then(response => {
        resetFormOutput()
        setWineCellars(response)
      }).catch(error => {
        resetFormOutput()
        setServerError(true)
        setWineCellars([])
      })

    const bottle_query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(bottle_url, bottle_query)
      .then(response => response.json())
      .then(response => {
        resetFormOutput()
        setName(response.name)
        setWineCellarId(response.wine_cellar_id)
      }).catch(error => {
        resetFormOutput()
        setServerError(true)
        setWineCellarId('')
      })

    }, [bottle_url])

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      name: name,
      wine_cellar_id: wineCellarId
    }
    const query = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      },
      body: JSON.stringify(body)
    };

    fetch(bottle_url, query)
      .then(response => {
        resetFormOutput()
        if(!response.ok){
          setformFailure(true)
        } else {
          setFormSuccess(true)
        }
      })
      .catch(error => {
        resetFormOutput()
        if(!formFailure) { setServerError(true) }
      })
  }

  const SuccessPopin = () => {
    return <>Your bottle has been updated</>
  }

  const TryLater = () => {
    return <span>Plz, try later</span>
  }

  return(
    <>
      <h1>Edit a bottle</h1>
      {serverError && <>Error 500</>}
      {formSuccess && <SuccessPopin />}
      {formFailure && <>The form is not valid</>}
      {cannotFetch ? <TryLater /> : <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={wineCellarId}
          onChange={(e) => { setWineCellarId(e.target.value) }}
        >
          { wineCellars.map(({id, name}) => { return(<option key={id} value={id}>{name}</option>)}) }
        </select>
        <input type="submit" />
      </form>
     }
    </>
  );
}
