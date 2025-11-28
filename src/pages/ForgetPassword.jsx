import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Loder from '../component/Loder'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
    const[sendotp,setsendotp]=useState(false)
    const[otp,setotp]=useState("")
    const[password,setpassword]=useState("")
    const[cpassword,setcpassword]=useState("")
    const[email,setemail]=useState("")
    const[loading,setloaing]=useState(false)
    const navigate= useNavigate();

    async function sendtootp(){
        setloaing(true);
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI+"/user/send-otp/"+email)
            toast.success("OTP sent to your email")
            setloaing(false)
            setsendotp(true)
        }catch(err){
         toast.error("Error sending otp")
        }
    }

    async function resetpassword(){
        if(password!==cpassword){
            toast.error("Password do not match")
            return
        }
        setloaing(true)
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URI+"/user/updatepassword",{
                email:email,
                otp:otp,
                password:password
            })
            toast.success("password rest succefully")
            setloaing(false)
            navigate("/loging")
        }catch(err){
            toast.error("Error resetting password. Try again later")
            setloaing(false)
        }
    }
    

  return (
    <div className='w-full h-full items-center justify-center flex'>
        {loading&&<Loder/>}
        {
            sendotp?(
            <div className='w-[400px] h-[400px] flex flex-col justify-center items-center bg-white border shadow-lg rounded-lg p-8'>
                <h1 className='text-2xl font-semibold mb-4'>Enter OTP and Password</h1>
                <input
                placeholder='Enter OTP'
                className='w-full border-2 p-2 mb-4 rounded-2xl  '
                onChange={(e)=>{setotp(e.target.value)}}
                />
                <input
                type='password'
                placeholder='Enter New Password'
                className='w-full border-2 p-2 mb-4 rounded-2xl  '
                onChange={(e)=>{setpassword(e.target.value)}}
                />

                <input
                type='password'
                placeholder='Enter confirm Password'
                className='w-full border-2 p-2 mb-4 rounded-2xl  '
                onChange={(e)=>{setcpassword(e.target.value)}}
                />

                <button className='bg-accent2 text-xl text-white font-semibold p-1.5 rounded-2xl w-full hover:bg-accent/70'onClick={resetpassword}>Reset Password</button>

            </div>
            ):(
            <div className='w-[400px] h-[400px] flex flex-col justify-center items-center bg-white border shadow-lg rounded-lg '>
                <h1 className='text-2xl font-semibold mb-4'>Rest your password</h1>
                <input
                type='email'
                placeholder='Enter your email'
                className='w-[300px] border-2 p-2 mb-4 rounded-2xl  '
                onChange={(e)=>{setemail(e.target.value)}}
                />

                <button className='bg-accent2 text-xl text-white font-semibold p-1.5 rounded-2xl w-[300px] hover:bg-accent/70'onClick={sendtootp}>Send OTP</button>

            </div>)
        }
      
    </div>
  )
}
