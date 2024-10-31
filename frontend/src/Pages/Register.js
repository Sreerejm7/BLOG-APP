import React, { useState } from 'react'
import './style/Login.css'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { handleSucess, handleError } from '../Toast'
import axios from 'axios'
const Register = () => {
    
    const navigate=useNavigate()

    const[input,setinput]=useState({
        name:'',
        phone:'',
        email:'',
        password:'',
    })

    const handlechange=(e)=>{
        const{name,value}=e.target;
        setinput((input)=>({...input,[name]:value}))
    }

    const handlesubmit=async (e)=>{
         e.preventDefault()
         const{name,phone,email,password}= input;
         if(!name||!phone||!email||!password)
         {
           return handleError("All Feilds Are Required")
         }
         try {
            const response=await  axios.post('https://blog-app-backend-e23q.onrender.com/register',{name,phone,email,password})
            if(response)
            {
              handleSucess(response.data.message)
              setTimeout(() => {
                navigate('/login')
              }, 1000);
            }
              console.error('Error during registration:', response.data);
         } catch (error) {
            if(error.response)
            {
                handleError(error.response.data.message)
                
            }
         }
    }
  return (
    <div className='container'>
      
      <h1>Register</h1>
      <form  onSubmit={handlesubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text"
          placeholder='Enter Your Name'
          name='name'
          onChange={handlechange}
          value={input.name}
          autoFocus
           />
          
        </div>
        
        <div>
          <label htmlFor="email">email</label>
          <input type="email"
          placeholder='Enter Your Email'
          name='email'
          onChange={handlechange}
          value={input.email}
         />
        </div>
        
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text"
          placeholder='Enter Your Mobile Number'
          name='phone'
          onChange={handlechange}
          value={input.phone}
          />
        </div>
        
        <div>
          <label label htmlFor="password">Password</label>
          <input type="password"
          placeholder='Enter Your Password'
          name='password'
          onChange={handlechange}
          value={input.password}
          />
        </div>
        
        <button type="submit">Register</button>
        <span>Already have an account?<Link to='/login'>Login</Link> </span>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Register
