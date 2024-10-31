import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './style/EditBlog.css';
import { handleError, handleSucess } from '../Toast';
import { ToastContainer } from 'react-toastify';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/getuserposts/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        setBlog(response.data.post); 
      } catch (error) {
        handleError ? handleError("An error occurred while fetching the post") : console.error(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleUpdate = async () => {
    
    if (!blog.title.trim()) {
      handleError("Title cannot be empty");
      return;
    }
  
    if (!blog.content.trim()) {
      handleError("Content cannot be empty");
      return;
    }
  
    try {
      const response =await axios.put(`http://localhost:4500/update/${id}`, blog, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data); 
      handleSucess(response.data.message);
      navigate('/blog/myblogs'); 
    } catch (error) {
      handleError("Error updating the post");
    }
  };
  

  return (
    <div className='edit-container'>
      <div className="edit-blog">
        <h2>Edit Blog</h2>
        <input
          className='title'
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          className='content'
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button className='update' onClick={handleUpdate}>Update Post</button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default EditBlog;
