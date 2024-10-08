import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

const AllEvents = () => {
    const navigate = useNavigate()
    const [page,setPage] = useState(1)
const [events,setEvents] = useState([])
const [currentEvents,setCurrentEvents] = useState([])

const getAllEvents =async()=>{

    const response = await axios.get('http://localhost:5000/api/v3/app/events')

    setEvents(response?.data)

    console.log(response.data)
}

const deleteEventFromBackend=async(id)=>{
    const isConfirmed = confirm('do you really want to delete?')

    // ! delete the image
    const response0 = await axios.delete(`http://localhost:5000/api/v3/app/images/${id}`)

    console.log(response0)
    if(!response0.status===200){
        alert
        return
    }
    if(!isConfirmed){
        return
    }
    
    if(!response0.status===200){
        alert('error occured while deleting image');
        return
    }
    const response = await axios.delete(`http://localhost:5000/api/v3/app/events/${id}`)
    console.log(response)
    getAllEvents()
    window.location.reload('/')
    
}

const redirectToUpdatePage = ()=>{

}


    useEffect(()=>{

        getAllEvents()

    },[])
  return (
    <div>
       


        <div className='container'>
            
            // ! difference between button & anchor
        <button className='w-100 p-5' onClick={()=>navigate('/addEvent')}>Let's add some events!</button>
            <div className="row eventsContainer justify-content-around align-items-center">
                {
                    
                    currentEvents ? currentEvents.map((event)=>{
                        return <div  key={event.id} className='singleEvent col-12 mt-5 p-5  col-md-6 col-lg-3 border border-black'>
                        <h4 onClick={()=>navigate(`/singleEvent/${event.id}`)}>{event.name}</h4>
                        <div className='d-flex justify-content-around'>
                        <button onClick={()=>navigate(`/editEvent/${event.id}`)}>Edit</button>
                        <button onClick={()=>deleteEventFromBackend(event.id)}>Delete</button>
                        </div>
                    </div>
                      }): <h1>No current events</h1>
                }
               {/* { events ? events.map((event)=>{

                    return <div key={event.id} className='singleEvent col-12 mt-5 p-5  col-md-6 col-lg-3 border border-black'>
                        <h4>{event.name}</h4>
                        <div className='d-flex justify-content-around'>
                        <button onClick={()=>navigate(`/editEvent/${event.id}`)}>Edit</button>
                        <button>Delete</button>
                        </div>
                    </div>
               }): <h1>No events found</h1>} */}
            </div>

            {/* ! Used ChatGPT's help to build the Pagination.jsx in components/Pagination.jsx  */}
            <Pagination events={events} setEvents={setEvents} currentEvents={currentEvents} setCurrentEvents={setCurrentEvents} limit={5} />
        </div>
    </div>
  )
}

export default AllEvents