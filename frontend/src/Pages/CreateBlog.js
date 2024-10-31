import React, { useState } from 'react'
import './style/CreateBlog.css'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../Toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateBlog = () => {
  
  const navigate=useNavigate()
   
  const[input,setinput]=useState({
    author:'',
    title:'',
    content:''
  })

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setinput((input)=>({...input,[name]:value}))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const{author,title,content}=input;
    if(!author||!title||!content)
    {
      return handleError("All Feilds Are Required")
    }
    try {
      const token=localStorage.getItem('token')
      if(!token)
      {
        navigate('/login')
      }
      const response = await axios.post("https://blog-app-backend-e23q.onrender.com/post",{ author, title, content },{  headers: {Authorization: `Bearer ${token}`,},});
      
      if(response)
      {
       
        localStorage.setItem('message',response.data.message)
        setTimeout(() => {
          navigate('/home')
        });
      }
    } catch (error) {
      if(error.response)
      {
        return handleError(error.response.data.message)
      }
    }
  }
  

  return (
    <div className='createPost'>
      <h2>Create Your Blog</h2>
     
      <form onSubmit={handleSubmit}>
        <div className='element'>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name='title'
            onChange={handleChange}
            value={input.title}
           
            
          />
        </div>
        <div className='element'>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name='author'
            onChange={handleChange}
            value={input.author}
          />
        </div>

        <div className='element'>
          <label htmlFor="content">Content:</label>
          <textarea 
            name='content'
            onChange={handleChange}
           value={input.content}
          />
        </div>
        <div className='creatediv'>
          <button className='create' type="submit">Create Blog</button>
        </div>
        
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateBlog;
