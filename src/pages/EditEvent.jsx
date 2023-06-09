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
  attendees:[]
  

}
const EditEvent = () => {

const [event,setEvent] = useState({})
  const params = useParams()
  const [file,setFile]= useState()
  const [name,setName] = useState()
  const [rigor_rank,setRigorRank] = useState()
  const [moderator,setModerator] = useState()
  const [subCategory,setSubCategory] = useState()
  const [category,setCategory] = useState()
  const [timingsFrom,setTimingsFrom] = useState()
  const [timingsTo,setTimingsTo] = useState()
  const [tagline,setTagline] = useState()
  const [attendeesNew,setAttendeesNew] = useState()
  const [photo,setPhoto] = useState()
  
  const [eventDetails,setEventDetails] = useState(event)
  const id = params.id

  const getSingleEvent = async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/v3/app/events?id=${id}`)
    let {name,category,subcategory,timingsFrom,timingsTo,rigor_rank,attendees,imageURL,tagline,moderator} = response.data[0]
   
    console.log(response.data)
    console.log(moment(timingsFrom).format('MMMM Do YYYY, h:mm:ss'))
    // same backend map logic but this time on frontend!
    setEvent({...response?.data[0],attendees:attendees.map((attendee)=>{
      return attendee.attendee_id
    }).toString()})

    setName(name)
    setCategory(category)
    setSubCategory(subcategory)
    setTimingsFrom(timingsFrom)
    setTimingsTo(timingsTo)
    setRigorRank(rigor_rank)
    setModerator(moderator)
    setTagline(tagline)
    setAttendeesNew(attendees.map((singleAttendee)=>{
      return singleAttendee.attendee_id
    }).toString())
    setPhoto(imageURL)
  }

 
const handleFileChange = (e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0])
}
const handleSubmit = async(e)=>{
    console.log(e.preventDefault())


   setAttendeesNew(convertStringToArray(attendeesNew.toString()))

   const formData = new FormData()


   try {
    
      formData.append("image",file)

    
    const response = await axios.put(`http://localhost:5000/api/v3/app/images/${id}/upload-image/`,formData)
  
  const imageUrl = response.data.data

   console.log(response,response.data.data, attendeesNew,'image response')

   const response2 = await axios.put(`http://localhost:5000/api/v3/app/events/${id}`,{imageURL:imageUrl,name,rigor_rank,timingsFrom
  ,timingsTo,moderator,category,subcategory:subCategory,tagline,attendees:convertStringToArray(attendeesNew.toString())
  })
   console.log(response2)
   setFile('')
   } catch (error) {
    console.log(error)
   }
}

  useEffect(()=>{
    getSingleEvent(id)
  },[])
  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

    Name<input type="text" name='name' onChange={(e)=>setName(e.target.value)} value={name}/>
   Category <input type="text" name='category'  onChange={(e)=>setCategory(e.target.value)} value={event?.category}/>
  
    
    
   Subcategory <input type="text" name='subcategory'  onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}/>
    moderator<input type="text" name='moderator'  onChange={(e)=>setModerator(e.target.value)} value={moderator}/>
   timingsFrom <input type="datetime-local" name='timingsFrom'  onChange={(e)=>setTimingsFrom(e.target.value)} value={timingsFrom}/>
    timingsTo<input type="datetime-local" name='timingsTo'  onChange={(e)=>setTimingsTo(e.target.value)} value={timingsTo}/>
    rigor_rank<input type="number" name='rigor_rank'  onChange={(e)=>setRigorRank(e.target.value)} value={rigor_rank}/>
    tagline<input type="text" name='tagline'  onChange={(e)=>setTagline(e.target.tagline)} value={tagline}/>
   attendees <input type="text" name='attendees'  onChange={(e)=>setAttendeesNew(e.target.value)} value={attendeesNew} />
    
    file<input type="file" name='image'  onChange={handleFileChange}/>
    <button type='submit'>Submit</button>
</form>
  )
}

export default EditEvent