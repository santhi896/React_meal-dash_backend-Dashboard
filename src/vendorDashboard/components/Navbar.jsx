import React from 'react'

const Navbar = ({ShowLoginHandler ,ShowRegisterHandler,showLogOut,LogOutHandler}) => {

  const firmName = localStorage.getItem('firmName')

  console.log(ShowLoginHandler)
  return (
    <div className='navsection'>
        <div className="company">Vendor  Dashboard</div>
        <div className="firmname">
          <h4>Firm Name :{firmName}</h4>
        </div>
        <div className="userAth">
          {!showLogOut?<>
          <span onClick={ShowLoginHandler}>Login/</span>
          <span onClick={ShowRegisterHandler}>Register</span>
          </> :<span onClick={LogOutHandler}>LogOut</span> }
          
        </div>
    </div>
  )
}

export default Navbar
