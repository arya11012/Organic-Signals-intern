import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";
import { dealerAuth } from '../../firebase';
import "./SignUp.css";
import { async } from '@firebase/util';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(dealerAuth,email,password);
            alert("Succesfully signed up");
            navigate("/Login");
        }
        catch(error){
            alert("Error"+error.message);
            console.error("Error signing up:", error);
        }
    }

  return (
    
    <div class="container">
        <form onSubmit={handleSubmit}>
            <p className="hea">Sign Up</p>
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
            <input type="Password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="Submit" value="Sign-Up" ></input>
            <p>Already Registered?</p>
            <button><Link to='/Login'className='btn'>Login</Link></button>
        </form>
        
    </div>
  )
}

export default SignUp
