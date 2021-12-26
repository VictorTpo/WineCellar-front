
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { currentAccountJwtToken } from '../utils/currentAccount'

function WineCellarsIndex() {
  const [list, setList] = useState([]);
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
        setCannotFetch(false)
        setList(results)
      }).catch(error => {
        setList([])
        setCannotFetch(true)
      })
  }

  useEffect(()=> {
    wineCellars();
  }, [])

  const listItems = list.map(({id, name}) =>
    <li key={id}>
      {name}
      <Link to={`/wine_cellars/${id}/edit`}>edit</Link>
    </li>
  )
  return(
    <>
      <h1>My wine cellars</h1>
      {cannotFetch && <>Cannot retrieve list</>}
      <ul>
        { listItems }
      </ul>
    </>
  )
}

export default WineCellarsIndex;
