import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

import { wineCellarsList } from '../utils/wineCellarsUtils'

import imgPencil from '../assets/images/icons/pencil.png';
import imgMobileWarning from '../assets/images/icons/mobile-warning.png';

function WineCellarsIndex() {
  const [list] = useState(wineCellarsList());

  const listItems = list.map(({id, name, sync}) =>
    <li key={id} className="list-group-item position-relative pb-3 pt-3">
      {name}
      <div className="position-absolute end-0 top-0">
        { !sync && <img src={imgMobileWarning} alt="inspect the bottle" width="40px" /> }
        <Link to={`/wine_cellars/${id}/edit`} className="mx-2">
          <img src={imgPencil} alt="edit the bottle" width="40px"/>
        </Link>
      </div>
    </li>
  )
  return(
    <>
      <Header title="My wine cellars" backTo="/" />
      <div className="container mxy-2">
        <ul className="list-group list-group-flush">
          { listItems }
        </ul>
      </div>
    </>
  )
}

export default WineCellarsIndex;
