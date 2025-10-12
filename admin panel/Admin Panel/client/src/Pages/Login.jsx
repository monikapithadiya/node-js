import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError]= useState(null)
    const {login} = useAuth()
    const naviagte = useNavigate()

    const handleSubmit = async (e)=>{
        
        e.preventDefault(); 
        try
        {
            const response = await axios.post("http://localhost:8080/api/auth/login",{email,password})
            // console.log(response)
            if(response.data.success)
            {
                    login(response.data.user)
                    localStorage.setItem("token",response.data.token)
                    if(response.data.user.role == "admin")
                    {
                        naviagte("/admin-dashboard")
                    }
                    else
                    {
                        naviagte("/employee-dashboard")
                    }
            }
        }
        catch(error)
        {
            if(error.response && !error.response.data.success)
            {
                setError(error.response.data.error)
            }
            else
            {
                setError("server error")
            }
        }
    }
    

  return (
    <div>
        <h2>Employee Management System</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
            <br /><br />
            <input type="password" placeholder='*******'  onChange={(e)=>setPassword(e.target.value)} required/>
            <br /><br />
            <button>Login</button>
        </form>

    </div>
  )
}

export default Login