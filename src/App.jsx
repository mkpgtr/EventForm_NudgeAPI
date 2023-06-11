import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateEvent2 from './pages/CreateEvent2'
import AllEvents from './pages/AllEvents'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import EditEvent2 from './pages/EditEvent2'
import SingleEvent from './pages/singleEvent'

function App() {

  const navigate = useNavigate()
  return (
   
       <div className='main-container'>
     
      {/* <CreateEvent /> */}
     
      <Routes>
        <Route path='/' element={<AllEvents />}/>
        <Route path ='/editEvent/:id' element ={<EditEvent2/>} />
        <Route path ='/addEvent' element ={<CreateEvent2/>} />
        <Route path ='/singleEvent/:id' element ={<SingleEvent/>} />
        <Route />
      </Routes>
      
      
    </div>
  )
}

export default App
