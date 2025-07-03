import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
   <>
    <div className="errorsection">
   <Link to = "/" style={{fontSize:'1.5rem',color:'darkblue'}}>
   <p>Go back</p>
   </Link>
  
    <h1>400</h1>
    <div>Page Not Found</div>
   </div>
   </>
  )
}

export default NotFound
