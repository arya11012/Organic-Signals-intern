import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { dealerAuth } from '../../firebase'
import "./Login.css"
const Login = () => {
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const UserCredentials=await signInWithEmailAndPassword(dealerAuth,email,password);
            console.log("User successfully logged in",UserCredentials);
            alert("Logged in");
            navigate("/Home");
        } 
        catch (error) {
            alert("Error:"+error.message);
        }
    }
    
  return (
    <div class="container">
        <form onSubmit={handleSubmit}>
            <p className="hea">Login</p>
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="Password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="Submit" value="Login" className='Login' ></input>
            <p>Don't have an account?</p>
            <button ><Link to='/SignUp'className='btn'>Sign Up</Link></button>
            <p><Link className='link' to='/ForgotPassword'> Forgot Password?</Link></p>
        </form>
        
    </div>
  )
}

export default Login

