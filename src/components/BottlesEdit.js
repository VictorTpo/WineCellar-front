import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

import FormInvalid from './FormOutputs/FormInvalid';
import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import Success from './Alerts/Success';
import Warning from './Alerts/Warning';

export default function BottlesEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [wineCellarId, setWineCellarId] = useState("");
  const [wineCellars, setWineCellars] = useState([]);
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setformInvalid] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  const bottle_url = `${process.env.REACT_APP_DOMAIN}/bottles/${id}`

  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformInvalid(false)
    setCannotFetch(false)
  }

  useEffect(()=> {
    const url = `${process.env.REACT_APP_DOMAIN}/wine_cellars`
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
        setWineCellars(response)
      }).catch(error => {
        setCannotFetch(true)
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
        setName(response.name)
        setWineCellarId(response.wine_cellar.id)
      }).catch(error => {
        setCannotFetch(true)
        setWineCellarId('')
      })

    }, [bottle_url])

  const handleSubmit = (event) => {
    event.preventDefault()
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
      <Header title="Edit a bottle" />
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
          <select
            value={wineCellarId}
            class="form-control form-select mb-3"
            onChange={(e) => { setWineCellarId(e.target.value) }}
          >
            { wineCellars.map(({id, name}) => { return(<option key={id} value={id}>{name}</option>)}) }
          </select>
          <input type="submit" className="btn btn-primary form-control" value="Update" />
          {serverError && <ServerError />}
          {formInvalid && <FormInvalid />}
          {formSuccess && <Success text="Bottle updated"/>}
        </form>
      }
      </div>
    </>
  );
}
