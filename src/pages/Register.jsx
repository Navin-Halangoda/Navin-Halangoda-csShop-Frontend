import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loder from "../component/Loder";

export default function Register() {
  const [firstName,setFirstNmae]= useState("")
  const [lastName,setLastNmae]= useState("")
  const [email,setemail]= useState("")
  const [password,setpassword]=useState("")
  const [confirmpassword,setconfirmpassword]=useState("")
  const navigate = useNavigate();
  const[isloading,setIsloading]=useState(false)

   async function Register(){
    if(firstName.trim()==""){
      toast.error("First name is required")
      return
    }
     if(lastName.trim()==""){
      toast.error("Last name is required")
      return
    }
      if(email.trim()==""){
      toast.error("email is required")
      return
    }
      if(password.trim()==""){
      toast.error("password is required")
      return
    }
     if(confirmpassword.trim()==""){
      toast.error("password is required")
      return
    }

    if(password!= confirmpassword){
      toast.error("password do not match")
      return
    }
    setIsloading(true)
    try{
       await axios.post(import.meta.env.VITE_BACKEND_URI+"/user/",{
        firstName:firstName.trim(),
        lastName:lastName.trim(),
        email:email.trim(),
        password:password.trim()
      })
      
      toast.success("Register succefully");
      setIsloading(false)
      setTimeout(() => {
        navigate("/loging")
      }, 2000);
      
    }
    catch(err){
      console.log(err);
      toast.error("user register failled");
      setIsloading(false)
    }  
    
  }
  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex items-center justify-center flex-col">
        <img src="/creative-computer-logo-template_23-2149201860.png" className="w-[250px] h-[250px] object-cover"/>
        <h1 className="text-[50px] font-bold text-center text-primmary ">Empowering Your Digital World</h1>
        <h2 className="text-[32px] text-primmary text center mt-[20px] italic text-shadow-2xs text-shadow-secondary">Your trusted source for computers, accessories, and smart solutions</h2>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">

        <div className="w-[500px] h-[650px] backdrop-blur-2xl shadow-2xl rounded-3xl flex justify-center items-center flex-col p-[30px]">

          <h1 className="mb-[20px] text-[40px] text-primmary font-bold ">Register</h1>

           <input 
            type="text" 
            placeholder="your First Name"
             onChange={(e)=>{setFirstNmae(e.target.value);
            }} 
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px] mb-[20px] focus:outline-none focus:ring-org focus:ring-2"/>

             <input 
            type="text" 
            placeholder="your Last name"
             onChange={(e)=>{setLastNmae(e.target.value);
            }} 
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px] mb-[20px] focus:outline-none focus:ring-org focus:ring-2"/>


          <input 
            type="email" 
            placeholder="your email"
             onChange={(e)=>{setemail(e.target.value);
            }} 
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px] mb-[20px] focus:outline-none focus:ring-org focus:ring-2"/>

          <input 
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
            type="password" 
            placeholder="your password" 
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px]  focus:outline-none focus:ring-org focus:ring- mb-[20px]"/>

             <input 
          onChange={(e)=>{
            setconfirmpassword(e.target.value)
          }}
            type="password" 
            placeholder="Retype password" 
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px]  focus:outline-none focus:ring-org focus:ring-2 mb-[20px]"/>

          <button 
            onClick={Register}
            className="w-full h-[50px] bg-org text-primmary rounded-lg border-2 border-accent font-bold text-[25px] hover:bg-transparent hover:text-secondary">Register</button>

          <p className="text-primmary">Alredy have an account? <Link to="/loging" className="italic">Login here</Link></p>

        </div>
      </div>
      {isloading&& <Loder/>}
    </div>
  )
}
