import React from 'react';

function Warning ({ text }){
  return(
    <div className='alert alert-warning mt-2'>
      <span>{text}</span>
    </div>
  )
}

export default Warning;
