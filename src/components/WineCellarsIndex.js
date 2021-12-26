
import React, { useEffect } from 'react';
import { useState } from 'react';
import { currentAccountJwtToken } from '../utils/currentAccount'

function WineCellarsIndex() {
  const [list, setList] = useState([]);
  const [serverError, setServerError] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)

  const wineCellars = () => {
    const url   = 'http://localhost:3003/wine_cellars'
    const query = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentAccountJwtToken()}`
      }
    };
    fetch(url, query)
      .then(response => response.json())
      .then(results => {
        setServerError(false)
        setCannotFetch(false)
        setList(results)
      }).catch(error => {
        setList([])
        setServerError(true)
      })
  }

  useEffect(()=> {
    wineCellars();
  }, [])

  const listItems = list.map(({id, name}) =>
    <li key={id}>{name}</li>
  )
  return(
    <>
      <h1>My list of wine cellars</h1>
      {serverError && <>Error 500</>}
      {cannotFetch && <>Cannot retrieve list</>}
      <ul>
        { listItems }
      </ul>
    </>
  )
}

export default WineCellarsIndex;
