import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Userdata() {
    const[user,setuser]=useState()
    const[selectedoption,setselectedoption]=useState("user")
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token!= null){
            axios.get(import.meta.env.VITE_BACKEND_URI+"/user/getuser",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }).then((res)=>{
                setuser(res.data)
            }).catch(()=>{
                setuser(null);
            })
        }
    },[])

  return (
    <>
    {
        user?
        <div className='w-[150px] flex flex-row '>
            <img src={user.image} className='w-[50px] h-[50px] rounded-full'/>
            <select className='bg-transparent outline-none ml-2' value={selectedoption}
             onChange={(e)=>{
                if(e.target.value=="logout"){
                    localStorage.removeItem("token");
                    window.location.href="/loging"
                }else if(e.target.value=="my-order"){
                    window.location.href="/orders"
                }
                setselectedoption("user")
             }}
            >
                <option  value={"user"} selected>{user.firstName}</option>
                <option value={"logout"}>Logout</option>
                <option value={"my-order"}>My Order</option>
            </select>
            </div>:
        <div className='w-[150px] flex flex-row'>
            <Link to="/loging" className="mx-2  px-4 py-2 bg-white text-accent2 rounded-full">Login</Link>
            <Link to="/register" className="mx-2 px-4 py-2 bg-white text-accent2 rounded-full">Register</Link>
        </div>
    }
      
    </>
  )
}
