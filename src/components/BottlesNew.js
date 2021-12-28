import React, { useEffect, useState } from 'react';

import { queryBuilder } from '../utils/fetchUtils'

import FormInvalid from './FormOutputs/FormInvalid';
import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import Success from './Alerts/Success';

export default function BottlesNew() {
  const [name, setName] = useState("");
  const [wineCellarId, setWineCellarId] = useState("");
  const [wineCellars, setWineCellars] = useState([]);
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setformInvalid] = useState(false)

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformInvalid(false)
  }

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_DOMAIN}/wine_cellars`, queryBuilder('GET'))
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

    const body  = {
      name: name,
      wine_cellar_id: wineCellarId
    }

    fetch(`${process.env.REACT_APP_DOMAIN}/bottles`, queryBuilder('POST', body))
      .then(response => {
        resetFormOutput()
        if(!response.ok){
          setformInvalid(true)
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
      <Header title="New bottle" />
      <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
      <input
          id="name"
          type="text"
          placeholder="name*"
          className="form-control mb-3 mt-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select onChange={(e) => { setWineCellarId(e.target.value) }} className="form-control form-select mb-3">
          <option value="">--Please choose a wine cellar--</option>
          { wineCellars.map(({id, name}) => { return(<option key={id} value={id}>{name}</option>)}) }
        </select>
        <input type="submit" className="btn btn-primary form-control" value="Create" />
        {serverError && <ServerError />}
        {formInvalid && <FormInvalid />}
        {formSuccess && <Success text="Bottle created"/>}
      </form>
    </>
  );
}
