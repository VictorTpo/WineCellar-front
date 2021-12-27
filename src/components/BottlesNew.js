import React, { useEffect, useState } from 'react';

import { currentAccountJwtToken } from '../utils/currentAccount'

export default function BottlesNew() {
  const [name, setName] = useState("");
  const [wineCellarId, setWineCellarId] = useState("");
  const [wineCellars, setWineCellars] = useState([]);
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformFailure(false)
  }

  useEffect(()=> {
    const url = `${process.env.REACT_APP_DOMAIN}/wine_cellars`
    const query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(url, query)
      .then(response => response.json())
      .then(response => {
        resetFormOutput()
        setWineCellars(response)
      }).catch(error => {
        resetFormOutput()
        setServerError(true)
        setWineCellars([])
      })
    }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const url   = `${process.env.REACT_APP_DOMAIN}/bottles`
    const body  = {
      name: name,
      wine_cellar_id: wineCellarId
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
          setFormSuccess(true)
          setName('')
        }
      }).catch(error => {
        resetFormOutput()
        setServerError(true)
      })
  }

  return(
    <>
      <h1>New Bottle Form</h1>
      {serverError && <>Error 500</>}
      {formSuccess && <>Your bottle has been saved</>}
      {formFailure && <>The form is not valid</>}
      <form onSubmit={handleSubmit}>
      <input
          id="name"
          type="text"
          placeholder="name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select onChange={(e) => { setWineCellarId(e.target.value) }}>
          <option value="">--Please choose a wine cellar--</option>
          { wineCellars.map(({id, name}) => { return(<option key={id} value={id}>{name}</option>)}) }
        </select>
        <input type="submit" />
      </form>
    </>
  );
}
