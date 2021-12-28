import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { queryBuilder } from '../utils/fetchUtils'

import Header from './Header';
import ServerError from './FormOutputs/ServerError';

import imgCorkscrew from '../assets/images/icons/corkscrew.png';
import imgNewBottle from '../assets/images/icons/new-bottle.png';

export default function BottlesShow() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [wineCellarName, setWineCellarName] = useState("");
  const [counter, setCounter] = useState("");
  const [serverError, setServerError] = useState(false)

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_DOMAIN}/bottles/${id}`, queryBuilder('GET'))
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

  function handleSubmit(factor) {
    const body = {
      counter: counter + factor
    }

    fetch(`${process.env.REACT_APP_DOMAIN}/bottles/${id}`, queryBuilder('PATCH', body))
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

  const BottleDetails = () => {
    return(
      <>
        <ul>
          <li>Name: {name}</li>
          <li>Wine cellar: {wineCellarName}</li>
          <li>Counter: {counter}</li>
        </ul>
        <div className="row fixed-bottom mb-5 text-center">
          <div className="col-6">
            <button onClick={() => handleSubmit(+1)} className="btn-img btn-app">
              <img src={imgNewBottle} alt="Add a new bottle" />
            </button>
          </div>
          <div className="col-6">
          { counter < 1 ? null :
            <button onClick={() => handleSubmit(-1)} className="btn-img btn-app">
            <img src={imgCorkscrew} alt="Remove a bottle" />
          </button>
          }
          </div>
        </div>
      </>
    )
  }

  return(
    <>
      <Header title="Inspect bottle" />
      <div className="container mxy-2">
        {serverError ? <ServerError /> : <BottleDetails />}
      </div>
    </>
  );
}
