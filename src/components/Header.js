import React from 'react';
import { useNavigate } from "react-router-dom";

import { wineCellarsList, wineCellarsUpdate } from "../utils/wineCellarsUtils"
import { queryBuilder } from "../utils/fetchUtils"

import imgPrevious from '../assets/images/icons/previous.png';
import imgCloud from '../assets/images/icons/cloud-save.png';

async function handleSave() {
  console.log('handleSave')
  var atLeastOneError = false
  wineCellarsList().forEach(wineCellar => {
    // console.log('each')
    // return new Promise(resolve=>{
      if(wineCellar.sync) { return }
        // console.log('id not sync', wineCellar.id)
        const body = wineCellar
        fetch(`${process.env.REACT_APP_DOMAIN}/wine_cellars/${wineCellar.id}`, queryBuilder('PATCH', body))
          .then(response => {
            if(response.ok){
              // console.log('saved! for id', wineCellar.id)
              wineCellarsUpdate(wineCellar.id, { sync: true })
            }
          })
          .catch(error => {
            atLeastOneError = true
          })
    // })

  })

  if (!atLeastOneError) { localStorage.removeItem("needSync") }
  window.location.reload()
}

function Header ({title, noBackBtn, backTo=-1}){
  let navigate = useNavigate();



  return(
    <header className="mb-3 position-relative">
      {!noBackBtn && <button onClick={() => navigate(backTo)} className="btn-img">
        <img src={imgPrevious} alt="previous page" width="30px" />
      </button>}
      <h1>{title ? title : "Wine Cellar Manager"}</h1>
      {localStorage.getItem("needSync") && <button onClick={handleSave} className="position-absolute end-0 top-0 btn-img">
        <img src={imgCloud} alt="save to cloud" width="50px" />
      </button>}
    </header>
  )
}

export default Header;
