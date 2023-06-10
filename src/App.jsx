import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateEvent from './pages/CreateEvent'
import AllEvents from './pages/AllEvents'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import EditEvent from './pages/EditEvent'

function App() {

  const navigate = useNavigate()
  return (
   
       <div className='main-container'>
     
      {/* <CreateEvent /> */}
     
      <Routes>
        <Route path='/' element={<AllEvents />}/>
        <Route path ='/editEvent/:id' element ={<EditEvent/>} />
        <Route path ='/addEvent' element ={<CreateEvent/>} />
        <Route />
      </Routes>
      
      
    </div>
  )
}

export default App
