import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { convertStringToArray } from '../utils/stringToArray'
const defaultFormObject = {
  name:"",
  subcategory:"",
  category:"",
  moderator:"",
  timingsTo:"",
  timingsFrom:"",
  rigor_rank:"",
  tagline:"",
  attendees:[],
  imageURL:''
  

}
const EditEvent = () => {

const [event,setEvent] = useState({})
  const params = useParams()
  const [file,setFile]= useState()
  const [name,setName] = useState()
  
  
  const [eventDetails,setEventDetails] = useState(defaultFormObject)
  const id = params.id

  const getSingleEvent = async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/v3/app/events?id=${id}`)
    let {name,category,subcategory,timingsFrom,timingsTo,rigor_rank,attendees,imageURL,tagline,moderator} = response.data[0]
   
    console.log(response.data)
    // same backend map logic but this time on frontend!
    setEventDetails({...response.data[0],attendees:attendees.map((attendee)=>{
      return attendee.attendee_id
    }).toString(), imageURL:response.data[0].imageURL})

    
    
  }

 
const handleFileChange = (e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0])
}

const handleChange = (e)=>{
  e.preventDefault()
  
  setEventDetails({...eventDetails,[e.target.name]:e.target.value})
}
console.log(eventDetails)
const handleSubmit = async(e)=>{
    console.log(e.preventDefault())


   

   const formData = new FormData()


   try {
    
      formData.append("image",file)

    
    const response = await axios.put(`http://localhost:5000/api/v3/app/images/${id}/upload-image/`,formData)
  
  const imageUrl = response.data.data

  

   console.log(response,response.data.data,'image response')

   const response2 = await axios.put(`http://localhost:5000/api/v3/app/events/${id}`,{...eventDetails,imageURL:response.data.data || eventDetails.imageURL})

   
 
   } catch (error) {
    console.log(error)
   }
}

  useEffect(()=>{
    getSingleEvent(id)
  },[])
  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

    Name<input type="text" name='name' onChange={handleChange} value={eventDetails.name}/>
   Category <input type="number" name='category'  onChange={handleChange} value={eventDetails.category}/>
   Subcategory <input type="number" name='subcategory'  onChange={handleChange} value={eventDetails.subcategory}/>
    moderator<input type="number" name='moderator'  onChange={handleChange} value={eventDetails.moderator}/>
    timingsTo<input type="datetime-local" name='timingsTo'  onChange={handleChange}/>
   timingsFrom <input type="datetime-local" name='timingsFrom'  onChange={handleChange}/>
    rigor_rank<input type="number" name='rigor_rank'  onChange={handleChange} value={eventDetails.rigor_rank}/>
    tagline<input type="text" name='tagline'  onChange={handleChange} value={eventDetails.tagline}/>
   attendees <input type="text" name='attendees'  onChange={handleChange} value={eventDetails.attendees}/>
    file<input type="file" name='image'  onChange={handleFileChange}/>
    <button type='submit'>Submit</button>
</form>
  )
}

export default EditEvent