import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Loder from "../component/Loder";

export default function Login() {
  const [email,setemail]= useState("")
  const [password,setpassword]=useState("")
  const navigate = useNavigate();
  const[isloading,setIsloading]=useState(false)
  const googleloging =useGoogleLogin({
    onSuccess:(response)=>{
      setIsloading(true);
      axios.post(import.meta.env.VITE_BACKEND_URI+"/user/googleloging",{
        token:response.access_token,
      }).then((res)=>{
        localStorage.setItem("token",res.data.token)
         if(res.data.role=="admin"){
        navigate("/admin")
        }else{
          navigate("/") 
        } 
        toast.success("Login succesfully");
        setIsloading(false)

      }).catch((err)=>{
        console.log(err);
        
      });
      setIsloading(false)
    },
    onError:()=>{toast.error(" Google login fail")},
    onNonOAuthError:()=>{toast.error("Google loging failed")}
  })

   async function login(){
    setIsloading(true)
    try{
      const res = await axios.post(import.meta.env.VITE_BACKEND_URI+"/user/loginuser",{
        email:email,
        password:password
      })
      console.log(res);
      localStorage.setItem("token",res.data.token)

      if(!res.data.token){
        toast.error("invalid username or password")
        return
      }
      
      if(res.data.role=="admin"){
        navigate("/admin")
      }else{
        navigate("/") 
      } 
      toast.success("Login succesfully");
      setIsloading(false)
    }
    catch(err){
      console.log(err);
      toast.error("loging fail");
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

          <h1 className="mb-[20px] text-[40px] text-primmary font-bold ">Login</h1>

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
            className="w-full h-[50px] border-2 border-accent rounded-lg p-[10px] text-[20px]  focus:outline-none focus:ring-org focus:ring-2"/>

          <p className="w-full text-primmary mb-[20px] text-right">Froget your password? <Link to="/forget-password" className="italic">Reset here</Link></p>

          <button 
            onClick={login}
            className="w-full h-[50px] bg-org text-primmary rounded-lg border-2 border-accent font-bold text-[25px] hover:bg-transparent hover:text-secondary mb-[20px]">Login</button>
             <button 
            onClick={googleloging}
            className="w-full h-[50px] bg-org text-primmary rounded-lg border-2 border-accent font-bold text-[25px] hover:bg-transparent hover:text-secondary"><div className="flex items-center justify-center gap-2">Login with <GrGoogle/></div></button>

          <p className="text-primmary">Don't have an account? <Link to="/register" className="italic">Register hear</Link></p>

        </div>
      </div>
       {isloading&& <Loder/>}
    </div>
  )
}
