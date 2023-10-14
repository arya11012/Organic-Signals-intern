import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { dealerAuth } from '../../firebase'
import "./Home.css"
const Home = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
        try {
            // Signing out the current dealer
            await signOut(dealerAuth);
            alert("Logged Out Successfully");
            navigate("/Login");
            
          } catch (e) {
            alert(e.message);
          }
    }
  return (
    <div className='container'>
      <button onClick={handleClick}>Log Out</button>
    </div>
  )
}

export default Home
