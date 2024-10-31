import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSucess } from '../Toast'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import './style/Login.css'

const Login = () => {
  const [input,setInput] = useState({email:"",password:""})

  const handleChange = (e)=>{
    const {name , value }= e.target;
    setInput({...input,[name]:value})
  }

  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {email ,password } = input
    if(!email || !password){
      return handleError("All Feilds Are Required")
    }
    else{
      try {
        const url = "https://blog-app-backend-6xv2.onrender.comlogin"
        const response = await axios.post(url,{email,password})
        if(response.data.token){
          localStorage.setItem('token',response.data.token)
          // localStorage.setItem('message',response.data.message)
          handleSucess(response.data.message)
          setTimeout(() => {
            navigate('/home')
          }, 1000);
        }
        
      } catch (error) {
        if('User Not Found!'){
          
          setTimeout(() => {
            navigate('/register')
          }, 1000);
        }
        if(error.response)
          {
              if(error.response.data.errors)
              {
                  const message=error.response.data.errors.map(err=>err.msg).join(', ')
                  handleError(message)
              }
              else
              {
                  handleError(error.response.data.message||'login failed')
              }
          }
          else
          {
              handleError("unexpected error occured")
          }
      }
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input type="email"
          placeholder='Enter your email'
          name='email'
          autoFocus
          onChange={handleChange}
          value={setInput.email} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password"
          placeholder='Enter your Password'
          name='password'
          onChange={handleChange}
          value={setInput.password}
           />
        </div>
        <button type="submit">Login</button>
        <span>Don't have an account? <Link to='/register'>Register</Link></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
