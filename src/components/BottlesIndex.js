
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { currentAccountJwtToken } from '../utils/currentAccount'

function BottlesIndex() {
  const [list, setList] = useState([]);
  const [cannotFetch, setCannotFetch] = useState(false)

  const bottles = () => {
    const url   = 'http://localhost:3003/bottles'
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
    bottles();
  }, [])

  const listItems = list.map(({id, name}) =>
    <li key={id}>
      {name}
      <Link to={`/bottles/${id}`}>show</Link>
      <Link to={`/bottles/${id}/edit`}>edit</Link>
    </li>
  )
  return(
    <>
      <h1>My bottles</h1>
      {cannotFetch && <>Cannot retrieve list</>}
      <ul>
        { listItems }
      </ul>
    </>
  )
}

export default BottlesIndex;
