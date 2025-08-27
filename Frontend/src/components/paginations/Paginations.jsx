import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

function Paginations({handlePrevBtn ,handleNextBtn,page ,setPage,pageCount}) {
  return (
    <>
    {
        pageCount > 0 && <div className="mt-5 position-absolute right-[20px] ">
        <Pagination
        >
        <Pagination.Prev onClick={()=>handlePrevBtn()}/>
         {/* {
            Array(pageCount).fill(null).map((el,index)=>{
                return(
                    <Pagination.Item onClick={setPage(index+1)} active>{index+1}</Pagination.Item>
                )
            })
         } */}
          <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next onClick={()=>handleNextBtn()}/>
      </Pagination>
      </div>
    }
    
    </>
  )
}

export default Paginations