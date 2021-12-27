import React from 'react';
import { useNavigate } from "react-router-dom";

import imgPrevious from '../assets/images/icons/previous.png';

function Header ({title, noBackBtn}){
  let navigate = useNavigate();

  return(
    <header className="mb-3">
      {!noBackBtn && <button onClick={() => navigate(-1)}>
        <img src={imgPrevious} alt="previous page" width="30px" />
      </button>}
      <h1>{title ? title : "Wine Cellar Manager"}</h1>
    </header>
  )
}

export default Header;
