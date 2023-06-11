import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleEvent = () => {

const params = useParams()
const [event,setEvent] = useState([])
const getSingleEvent = async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/v3/app/events?id=${id}`)
    setEvent(response.data[0])
}
const id = params.id
useEffect(()=>{
    getSingleEvent(id)
},[])

  return (
    <div className="container">
        <div className="row justify-between border border-dark">
            <div className="col-lg-6 col-md-6 col-sm-4">
              <div className="img-container">
              <img  src={event?.imageURL} alt="event_Image" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center flex-column justify-content-center">
                <h1>{event.name}</h1>
                <h5>{event.tagline}</h5>
                <h4>Moderator ID : {event.moderator}</h4>
            </div>
       
        </div>
    </div>
  )


}

export default SingleEvent