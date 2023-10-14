import React ,{useState}from 'react';
import { dealerAuth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await sendPasswordResetEmail(dealerAuth,email);
            alert("A recovery mail has been sent to the registered email id")
        } catch (error) {
            alert(error.message);
        }
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Password Recovery</h1>
        <h2>Enter your email below</h2>
        <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        <input type='submit'></input>
      </form>
    </div>
  )
}

export default ForgotPassword
