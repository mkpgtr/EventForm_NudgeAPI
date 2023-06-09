import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
const EditEvent = () => {

const [event,setEvent] = useState({})
  const params = useParams()

  const id = params.id

  const getSingleEvent = async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/v3/app/events?id=${id}`)
    console.log(response)
    setEvent(response.data[0])
  }

  console.log(event)
  const handleChange = ()=>{

  }
  const handleSubmit = ()=>{

  }

  useEffect(()=>{
    getSingleEvent(id)
  },[])
  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

        Name<input type="text" name='name' value={event?.name}/>
       Category <input type="number" name='category'  onChange={handleChange} value={event?.category}/>
       Subcategory <input type="number" name='subcategory'  onChange={handleChange} value={event?.subcategory}/>
        moderator<input type="number" name='moderator'  onChange={handleChange} value={event?.moderator}/>
        timingsTo<input type="datetime-local" name='timingsTo'  onChange={handleChange} value={event?.timingsTo}/>
       timingsFrom <input type="datetime-local" name='timingsFrom'  onChange={handleChange} value={event?.timingsFrom}/>
        rigor_rank<input type="number" name='rigor_rank'  onChange={handleChange } value={event?.rigor_rank}/>
        tagline<input type="text" name='tagline'  onChange={handleChange} value={event?.tagline}/>
       {/* attendees <input type="text" name='attendees'  onChange={handleChange} value={event?.attendees.toString()}/> */}
        file<input type="file" name='image'  />
        <button type='submit'>Submit</button>
    </form>
  )
}

export default EditEvent