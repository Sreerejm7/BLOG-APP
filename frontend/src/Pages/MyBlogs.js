import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/MyBlogs.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from '../Toast';
import { ToastContainer } from 'react-toastify';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);    

  useEffect(()=>{
    const fetchBlogs = async()=>{
      try {
        const url = 'https://blog-app-backend-6xv2.onrender.com/getuserposts'
      const response = await axios.get(url,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
      setBlogs(response.data.results)
      } catch (error) {
        handleError("An error occurred while fetching posts");
        
      }
    }
    fetchBlogs()
  },[])
  const navigate = useNavigate()

  const onDelete = async(id)=>{
    try {
      const url = `https://blog-app-backend-6xv2.onrender.com/delete/${id}`
       const response=await axios.delete(url,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
      setBlogs(blogs.filter((blog)=>blog._id!==id))
      handleSucess(response.data.message)
    } catch (error) {
      handleError("An error occurred while deleting the post");
    }
  }

  const handleEdit=(id)=>{
    navigate(`/blog/edit/${id}`)
  }

  return (
    <div className="container-myblog">
      <div className='myblogs'>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog-container" key={blog._id}>
            <div className="title"><h1>{blog.title}</h1></div>
            <div className='auth-details'>
              <div className="author"><h3>{blog.author}</h3></div>
              <div className="time">
                <div className="created">Created: {new Date(blog.createdAt).toLocaleDateString()}</div>
                <div className="updated">Updated: {new Date(blog.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="content">{blog.content}</div>
            <div className="buttons">
              <button id='edit' onClick={()=>handleEdit(blog._id)}>EDIT</button>
              <button id='delete' onClick={()=>onDelete(blog._id)}>DELETE</button>
            </div>
          </div>
        ))
      )}
    </div>
    <ToastContainer/>
    </div>
    
  );
}

export default MyBlogs;
