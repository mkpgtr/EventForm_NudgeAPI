import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
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
  const navigate = useNavigate()
  
  
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

       let key;
       for(key in eventDetails){
        if(!eventDetails[key]){
            alert(`please provide ${key}`)
            return
        }
       }

   

   const formData = new FormData()


   try {
    
      formData.append("image",file)

    
    const response = await axios.put(`http://localhost:5000/api/v3/app/images/${id}/upload-image/`,formData)
  
  const imageUrl = response.data.data

  

   console.log(response,response.data.data,'image response')

   const response2 = await axios.put(`http://localhost:5000/api/v3/app/events/${id}`,{...eventDetails,imageURL:response.data.data || eventDetails.imageURL})

   alert('event updated successfullly')
   
   navigate('/')
 
   } catch (error) {
    console.log(error)
   }
}

  useEffect(()=>{
    getSingleEvent(id)
  },[])
  return (
    <>
    {/* <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

    Name<input type="text" name='name' onChange={handleChange} value={eventDetails.name}/>
   Category <input type="number" name='category'  onChange={handleChange} value={eventDetails.category}/>
   Subcategory <input type="number" name='subcategory'  onChange={handleChange} value={eventDetails.subcategory}/>
    moderator<input type="number" name='moderator'  onChange={handleChange} value={eventDetails.moderator}/>
   {'On '+moment(eventDetails?.timingsFrom).format('MMM-Do-YY hh:ss')}
<input type="datetime-local" name='timingsTo'  onChange={handleChange}/>
   {'On ' +moment(eventDetails?.timingsTo).format('YYYY-mm-dd hh:ss')}
    <input type="datetime-local" name='timingsFrom'  onChange={handleChange}/>
    rigor_rank<input type="number" name='rigor_rank'  onChange={handleChange} value={eventDetails.rigor_rank}/>
    tagline<input type="text" name='tagline'  onChange={handleChange} value={eventDetails.tagline}/>
   attendees <input type="text" name='attendees'  onChange={handleChange} value={eventDetails.attendees}/>
    file<input type="file" name='image'  onChange={handleFileChange}/>
    {file && <img width={200} src={`${URL.createObjectURL(file)}`}></img> ||eventDetails.imageURL && <img width={200} src={eventDetails.imageURL}></img>}
    
    <button type='submit'>Submit</button>
</form> */}

<form onSubmit={handleSubmit}>

    <div class="mb-3">
  <input type="type" class="form-control" name='name' value={eventDetails.name} onChange={handleChange} placeholder="Name of the event"/>
</div>


<div class="mb-3">
  <input type="number" class="form-control" name='category' onChange={handleChange} 
  value={eventDetails.category}
  placeholder="Category"/>
</div>

<div class="mb-3">
  <input type="number" class="form-control" name='subcategory' onChange={handleChange}
  value={eventDetails.subcategory}
  placeholder="Subcategory"/>
</div>

<div class="mb-3">
  <input type="number" class="form-control" name='moderator' onChange={handleChange} 
  value={eventDetails.moderator}
  placeholder="Moderator"/>
</div>

<div class="mb-3">
  <input type="datetime-local" class="form-control" name='timingsFrom' value={eventDetails.timingsFrom} onChange={handleChange} placeholder="From"/>
</div>
<div class="mb-3">
  <input type="datetime-local" class="form-control" name='timingsTo' value={eventDetails.timingsTo} onChange={handleChange} placeholder="To"/>
</div>



<div class="mb-3 d-flex align-items-center justify-content-between gap-5">
  <input type="number" class="form-control" name='rigor_rank' value={eventDetails.rigor_rank} onChange={handleChange} placeholder="Rigor Rank"/>
</div>
<div class="mb-3 d-flex align-items-center justify-content-between gap-3">
  <input type="text" class="form-control" name='attendees' value={eventDetails.attendees} onChange={handleChange} placeholder="Attendees"/>
</div>

{file && <img width={200} src={`${URL.createObjectURL(file)}`}></img> ||eventDetails.imageURL && <img width={200} src={eventDetails.imageURL}></img>}
<div class="mb-3">
  <input type="file" class="form-control" name='image' onInput={handleFileChange} placeholder="Attendees"/>
</div>
<div class="mb-3">
  <input type="text" class="form-control" name='tagline' value={eventDetails.tagline} onChange={handleChange} placeholder="Tagline"/>
</div>
<div class="mb-3 d-flex align-items-center justify-content-between gap-3">
  <button type="submit" class="form-control btn btn-primary" >Edit Event</button>
</div>
</form>
</>
  )
}

export default EditEvent