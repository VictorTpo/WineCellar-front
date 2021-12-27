
import React from 'react';
import imgPrevious from '../assets/images/icons/previous.png';
import { useNavigate } from "react-router-dom";

function Header ({title, noBackBtn}){
  let navigate = useNavigate();

  return(
    <header>
      {!noBackBtn && <button onClick={() => navigate(-1)}>
        <img src={imgPrevious} alt="previous page" width="30px" />
      </button>}
      <h1>{title ? title : "Wine Cellar Manager"}</h1>
    </header>
  )
}

export default Header;
