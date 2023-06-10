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
            return <div key={event.id} style={{display:'flex', justifyContent:'center'}}>
                <span>{event.name}</span>
                <button onClick={()=>navigate(`/editEvent/${event.id}`)}>Edit</button>
                <button onClick={()=>deleteEventFromBackend(event.id)}>Delete</button>
            </div>
        })}
    </div>
  )
}

export default AllEvents