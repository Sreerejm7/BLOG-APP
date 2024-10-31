import React, { useEffect,useState } from 'react'
import { ToastContainer} from 'react-toastify'
import {handleSucess,handleError } from '../Toast.js'
import './style/Home.css'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
const navigate=useNavigate()  

useEffect(() => {
  const message=localStorage.getItem('message')
  if(message)
  {
    handleSucess(message)
    setTimeout(() => {
      localStorage.removeItem('message')
    }, 3000);
  }

  const fetchBlogs = async()=>{
    try {
      const url = 'https://blog-app-backend-e23q.onrender.com/getallpost'
    const response = await axios.get(url,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    setBlogs(response.data.post)
    } catch (error) {
      handleError("An error occurred while fetching posts");
      
    }
  }
  fetchBlogs()
}, [])

const handleCreate=()=>{
  navigate('/blog/create')
}
const handleMyblog = ()=>{
  navigate('/blog/myblogs')
}

const handleLogout = () => {
  localStorage.removeItem('token'); 
  navigate('/login');
};

  
  return (
    <div className='first'>
      <div className='navbar'>
           <div className='logo'>
            <img src='https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/blogs/15926/images/aLZst1n4RTWIunfAHw5b_blog.jpg' alt="logo" />
            </div>  
            <ul>
              <li id='create' onClick={handleCreate} >Create</li>
              <li onClick={handleMyblog}>My Blogs</li>
              <li onClick={handleLogout}>Logout</li>

            </ul>
      </div>
      <div className='allposts'>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div className="allblog-container" key={blog._id}>
            <div className="alltitle"><h1>{blog.title}</h1></div>
            <div className='allauth-details'>
              <div className="allauthor"><h4>{blog.author}</h4></div>
              <div className="alltime">
                <div className="allcreated">Created: {new Date(blog.createdAt).toLocaleDateString()}</div>
                <div className="allupdated">Updated: {new Date(blog.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="allcontent">{blog.content}</div>
          </div>
        ))
      )}
    </div>
      <ToastContainer/>
    </div>
  )
}

export default Home