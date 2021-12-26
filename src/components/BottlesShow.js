import React, { useEffect } from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'
import { useParams } from 'react-router-dom';

export default function BottlesShow() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [wineCellarName, setWineCellarName] = useState("");
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
      .then(response => {
        setServerError(false)
        setName(response.name)
        setWineCellarName(response.wine_cellar.name)
      }).catch(error => {
        setName("")
        setWineCellarName("")
        setServerError(true)
      })
    }, [id])

  const BottleDetails = () => {
    return(
      <ul>
        <li>Name: {name}</li>
        <li>Wine cellar: {wineCellarName}</li>
      </ul>
    )
  }

  return(
    <>
      <h1>Show a bottle</h1>
      {serverError ? <>Error 500</> : <BottleDetails />}
    </>
  );
}
