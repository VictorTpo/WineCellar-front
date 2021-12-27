import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

function WineCellarsIndex() {
  const [list, setList] = useState([]);
  const [cannotFetch, setCannotFetch] = useState(false)

  useEffect(()=> {
    const url   = `${process.env.REACT_APP_DOMAIN}/wine_cellars`
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
