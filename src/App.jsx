import React from 'react'
import Landingpage from './vendorDashboard/pages/Landingpage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path = '/' element = {<Landingpage/>}/>
      <Route path ='/*' element = {<NotFound/>}/>
     </Routes>
    </div>
  )
}

export default App
