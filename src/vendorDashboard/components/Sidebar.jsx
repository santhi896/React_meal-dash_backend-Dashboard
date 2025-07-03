import React from 'react'

const Sidebar = ({ShowFirmHandler ,ShowProductHandler,ShowAllProductsHandler,showFirmTitle}) => {
  return (
    <div className="sidebar-section">
        <ul>
            {showFirmTitle ? <li onClick={ShowFirmHandler}>Add Firm</li> :""}
            <li onClick={ShowProductHandler}>Add Product</li>
            <li onClick={ShowAllProductsHandler}>All Product</li>
            <li>User Details</li>
        </ul>
    </div>

  )
}

export default Sidebar
