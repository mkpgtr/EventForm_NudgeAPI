import React, { useState } from 'react'
import axios from 'axios'
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
const CreateEvent = () => {

    const [eventDetails,setEventDetails] = useState(defaultFormObject)
    const [file,setFile] = useState('')

    const handleChange =(e)=>{
        setEventDetails({...eventDetails,[e.target.name]:e.target.value})
        
    }
    const handleFileChange = (e)=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    const handleSubmit = async(e)=>{
        console.log(e.preventDefault())

let key;
       for(key in eventDetails){
        if(!eventDetails[key]){
            alert(`please provide ${key}`)
            return
        }
       }

       // all the logic after the form has passed empty value checks
       console.log(eventDetails) 
       eventDetails.attendees = convertStringToArray(eventDetails.attendees.toString())

       const formData = new FormData()

  
       try {
        formData.append("image",file)

       const response = await axios.post(`http://localhost:5000/api/v3/app/nudge/image/upload-image`,formData)

       console.log(response.data.data)

       eventDetails.imageURL = response.data.data

       const response2 = await axios.post(`http://localhost:5000/api/v3/app/events`,eventDetails)
       console.log(response2)
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

        Name<input type="text" name='name' onChange={handleChange}/>
       Category <input type="number" name='category'  onChange={handleChange}/>
       Subcategory <input type="number" name='subcategory'  onChange={handleChange}/>
        moderator<input type="number" name='moderator'  onChange={handleChange}/>
        timingsTo<input type="datetime-local" name='timingsTo'  onChange={handleChange}/>
       timingsFrom <input type="datetime-local" name='timingsFrom'  onChange={handleChange}/>
        rigor_rank<input type="number" name='rigor_rank'  onChange={handleChange}/>
        tagline<input type="text" name='tagline'  onChange={handleChange}/>
       attendees <input type="text" name='attendees'  onChange={handleChange}/>
        file<input type="file" name='image'  onChange={handleFileChange}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default CreateEvent