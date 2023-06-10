import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AllEvents = () => {
    const navigate = useNavigate()
const [events,setEvents] = useState([])

const getAllEvents =async()=>{

    const response = await axios.get('http://localhost:5000/api/v3/app/events')

    setEvents(response?.data)

    console.log(response.data)
}

const deleteEventFromBackend=async(id)=>{
    const isConfirmed = confirm('do you really want to delete?')

    if(!isConfirmed){
        return
    }
    const response = await axios.delete(`http://localhost:5000/api/v3/app/events/${id}`)
    console.log(response)
    getAllEvents()
    
}

const redirectToUpdatePage = ()=>{

}
    useEffect(()=>{

        getAllEvents()

    },[])
  return (
    <div>
        {events && events.map((event)=>{
            return <div key={event.id} style={{display:'flex', 
            gap:"2rem",
            border:"2px solid black",
            padding:"4rem",
            borderRadius:"30px",
            justifyContent:'center',
            alignItems:'center'}}>
                <h3>{event.name}</h3>

             <div>
             <button onClick={()=>navigate(`/editEvent/${event.id}`)}>Edit</button>
                <button onClick={()=>deleteEventFromBackend(event.id)}>Delete</button>
             </div>
            </div>
        })}
    </div>
  )
}

export default AllEvents