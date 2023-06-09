import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateEvent from './pages/CreateEvent'
import AllEvents from './pages/AllEvents'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditEvent from './pages/EditEvent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      {/* <CreateEvent /> */}
      <Routes>
        <Route path='/' element={<AllEvents />}/>
        <Route path ='/editEvent/:id' element ={<EditEvent/>} />
        <Route path ='/addEvent' element ={<CreateEvent/>} />
        <Route />
      </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
