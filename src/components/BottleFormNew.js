import React from 'react';
import { useState } from 'react';

export default function BottleFormNew() {
  const [name, setName] = useState("");
  const [serverError, setServerError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formFailure, setformFailure] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const url   = 'http://localhost:3003/bottles'
    const body  = { name: name }
    const query = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(url, query)
      .then(response => {
        setServerError(false)
        if(!response.ok){
          setformFailure(true)
        } else {
          setFormSuccess(true)
          setName('')
        }
      }).catch(error => {
        setServerError(true)
      })
  }

  return(
    <>
      <h1>New Bottle Form</h1>
      {serverError && <>Error 500</>}
      {formSuccess && <>Your bottle has been saved</>}
      {formFailure && <>The form is not valid</>}
      <form onSubmit={handleSubmit}>
      <input
          id="email"
          type="text"
          placeholder="name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}
