import React, { useEffect } from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'
import { useParams } from 'react-router-dom';

export default function BottlesShow() {
  const { id } = useParams();

  const [factor, setFactor] = useState(0);
  const [name, setName] = useState("");
  const [wineCellarName, setWineCellarName] = useState("");
  const [counter, setCounter] = useState("");
  const [serverError, setServerError] = useState(false)

  useEffect(()=> {
    const url = `http://localhost:3003/bottles/${id}`
    const query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(url, query)
      .then(response => response.json())
      .then(bottle => {
        setServerError(false)
        setName(bottle.name)
        setWineCellarName(bottle.wine_cellar.name)
        setCounter(bottle.counter)
      }).catch(error => {
        setName("")
        setWineCellarName("")
        setCounter("")
        setServerError(true)
      })
    }, [id])

  const BottleDetails = () => {
    return(
      <ul>
        <li>Name: {name}</li>
        <li>Wine cellar: {wineCellarName}</li>
        <li>Counter: {counter}</li>
      </ul>
    )
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const bottle_url = `http://localhost:3003/bottles/${id}`
    console.log('factor', factor)
    const body = {
      counter: counter + factor
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
        if(!response.ok){
          // todo
        } else {
          setCounter(counter + factor)
        }
      })
      .catch(error => {
        // todo
      })
  }


  return(
    <>
      <h1>Show a bottle</h1>
      {serverError ? <>Error 500</> : <BottleDetails />}
      { counter < 1 ? null :
        <form onSubmit={handleSubmit}>
          <input onClick={() => setFactor(-1) } type="submit" value='I open 1' />
        </form>
      }
      <form onSubmit={handleSubmit}>
        <input onClick={() => setFactor(+1) } type="submit" value='I buy a new one' />
      </form>
    </>
  );
}
