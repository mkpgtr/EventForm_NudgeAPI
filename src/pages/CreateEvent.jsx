import React, { useState } from 'react'
import axios from 'axios'

import { convertStringToArray } from '../utils/stringToArray'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    const handleChange =(e)=>{
        setEventDetails({...eventDetails,[e.target.name]:e.target.value})
        
    }
    const handleFileChange = (e)=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    const handleSubmit = async(e)=>{
        console.log(e.preventDefault())

        if(!file){
            alert('please choose a picture')
            return
        }
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

       const response = await axios.post(`http://localhost:5000/api/v3/app/images/upload-image`,formData)

       console.log(response.data.data)

       eventDetails.imageURL = response.data.data

       const response2 = await axios.post(`http://localhost:5000/api/v3/app/events`,eventDetails)
      
       console.log(response2.data)
       alert('event updated successfully')
      navigate('/')
       } catch (error) {
        if(error.response.data.message==='invalid attendee ID entered in attendee array'){
            alert(error.response.data.message)
            return
        }else if(error.response.data.message.startsWith('no such')){
            alert(error.response.data.message)
        }
        console.log(error)
       }
    }
  return (
    <>
    {/* <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

        Name<input type="text" name='name' onChange={handleChange}/>
       Category <input type="number" name='category'  onChange={handleChange}/>
       Subcategory <input type="number" name='subcategory'  onChange={handleChange}/>
        moderator<input type="number" name='moderator'  onChange={handleChange}/>
        timingsTo<input type="datetime-local" name='timingsTo'  onChange={handleChange}/>
       timingsFrom <input type="datetime-local" name='timingsFrom'  onChange={handleChange}/>
        rigor_rank<input type="number" name='rigor_rank'  onChange={handleChange}/>
        tagline<input type="text" name='tagline'  onChange={handleChange}/>
        {file && <div
        style={{display:'flex'}}
        ><img width={200} src={`${URL.createObjectURL(file)}`}></img>
        <button onClick={()=>setFile(null)}>X</button>
        </div>}
       attendees <input type="text" name='attendees'  onChange={handleChange}/>
        file<input type="file" name='image'  onInput={handleFileChange}/>
        <button type='submit'>Submit</button>
    </form> */}

<form onSubmit={handleSubmit}>

    <div class="mb-3">
  <input type="type" class="form-control" name='name' onChange={handleChange} placeholder="Name of the event"/>
</div>

<div class="mb-3">
  <input type="number" class="form-control" name='category' onChange={handleChange} placeholder="Category"/>
</div>

<div class="mb-3">
  <input type="number" class="form-control" name='subcategory' onChange={handleChange} placeholder="Subcategory"/>
</div>

<div class="mb-3">
  <input type="number" class="form-control" name='moderator' onChange={handleChange} placeholder="Moderator"/>
</div>

<div class="mb-3">
  <input type="datetime-local" class="form-control" name='timingsFrom' onChange={handleChange} placeholder="From"/>
</div>
<div class="mb-3">
  <input type="datetime-local" class="form-control" name='timingsTo' onChange={handleChange} placeholder="To"/>
</div>



<div class="mb-3 d-flex align-items-center justify-content-between gap-5">
  <input type="number" class="form-control" name='rigor_rank' onChange={handleChange} placeholder="Rigor Rank"/>
</div>
<div class="mb-3 d-flex align-items-center justify-content-between gap-3">
  <input type="text" class="form-control" name='attendees' onChange={handleChange} placeholder="Attendees"/>
</div>

{file && <div
        style={{display:'flex'}}
        ><img width={200} src={`${URL.createObjectURL(file)}`}></img>
        <button onClick={()=>setFile(null)}>X</button>
        </div>}
<div class="mb-3">
  <input type="file" class="form-control" name='image' onInput={handleFileChange} placeholder="Attendees"/>
</div>
<div class="mb-3">
  <input type="text" class="form-control" name='tagline' onChange={handleChange} placeholder="Tagline"/>
</div>
<div class="mb-3 d-flex align-items-center justify-content-between gap-3">
  <button type="submit" class="form-control btn btn-primary">Add Event</button>
</div>
</form>
    </>
  )
}

export default CreateEvent