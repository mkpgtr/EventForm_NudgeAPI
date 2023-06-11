import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

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
       


        <div className='container'>
        <button className='w-100 p-5' onClick={()=>navigate('/addEvent')}>Add Event</button>
            <div className="row eventsContainer justify-content-around align-items-center">
               {events ? events.map((event)=>{

                    return <div key={event.id} className='singleEvent col-12 mt-5 p-5  col-md-6 col-lg-3 border border-black'>
                        <h4>{event.name}</h4>
                        <div className='d-flex justify-content-around'>
                        <button onClick={()=>navigate(`/editEvent/${event.id}`)}>Edit</button>
                        <button>Delete</button>
                        </div>
                    </div>
               }): <h1>No events found</h1>}
            </div>

            <Pagination events={events} setEvents={setEvents} limit={1} />
        </div>
    </div>
  )
}

export default AllEvents