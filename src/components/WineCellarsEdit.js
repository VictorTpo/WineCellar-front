import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { wineCellarsFind, wineCellarsUpdate } from '../utils/wineCellarsUtils'

import FormInvalid from './FormOutputs/FormInvalid';
import Header from './Header';
import ServerError from './FormOutputs/ServerError';
import Success from './Alerts/Success';
import Warning from './Alerts/Warning';

export default function WineCellarsEdit() {
  const { id } = useParams();
  const [name, setName] = useState(wineCellarsFind(id).name);
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formInvalid, setformInvalid] = useState(false)
  const [cannotFetch, setCannotFetch] = useState(false)
  let navigate = useNavigate();


  function resetFormOutput() {
    setServerError(false)
    setFormSuccess(false)
    setformInvalid(false)
    setCannotFetch(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    wineCellarsUpdate(id, { name: name, sync: false })

    localStorage.setItem("needSync", true)
    navigate('/wine_cellars')
  }

  return(
    <>
      <Header title="Edit wine cellar" />
      <div className="container">
        {cannotFetch ? <Warning text="Server Error, please try later" /> : <form onSubmit={handleSubmit} className="card bg-light border-light text-center container">
          <input
            id="name"
            type="text"
            placeholder="name*"
            className="form-control mb-3 mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" className="btn btn-primary form-control" value="Update" />
          {serverError && <ServerError />}
          {formInvalid && <FormInvalid />}
          {formSuccess && <Success text="Wine cellar updated"/>}
        </form>
      }
     </div>
    </>
  );
}
