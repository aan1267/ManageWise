import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Spiner() {
  return (
    <>
     <div className="flex justify-center items-center w-full mt-[100px]">
     <Spinner animation="border" variant="danger" />&nbsp;
     <span>Loading...</span> 
     </div>
    </>
  )
}

export default Spiner