import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { currentAccountJwtToken } from '../utils/currentAccount'

import Header from './Header';
import Warning from './Alerts/Warning';

import imgEye from '../assets/images/icons/eye.png';
import imgPencil from '../assets/images/icons/pencil.png';

function BottlesIndex() {
  const [list, setList] = useState([]);
  const [cannotFetch, setCannotFetch] = useState(false)

  useEffect(()=> {
    const url   = `${process.env.REACT_APP_DOMAIN}/bottles`
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
      <div className="position-absolute end-0 top-0">
        <Link to={`/bottles/${id}`}><img src={imgEye} alt="inspect the bottle" width="50px"/></Link>
        <Link to={`/bottles/${id}/edit`} className="mx-2">
          <img src={imgPencil} alt="edit the bottle" width="40px"/>
        </Link>
      </div>
    </li>
  )
  return(
    <>
      <Header title="My bottles" />
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

export default BottlesIndex;
