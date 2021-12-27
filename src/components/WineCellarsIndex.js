import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

import Header from './Header';
import Warning from './Alerts/Warning';

import imgPencil from '../assets/images/icons/pencil.png';

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
    <li key={id} className="list-group-item position-relative pb-3 pt-3">
      {name}
      <Link to={`/wine_cellars/${id}/edit`} className="position-absolute end-0">
        <img src={imgPencil} alt="edit the bottle" width="40px"/>
      </Link>
    </li>
  )
  return(
    <>
      <Header title="My wine cellars" />
      <div className="container mxy-2">
        {cannotFetch ? <Warning text="Cannot retrieve list" /> :
          <ul className="list-group list-group-flush">
            { listItems }
          </ul>
        }
      </div>
    </>
  )
}

export default WineCellarsIndex;
