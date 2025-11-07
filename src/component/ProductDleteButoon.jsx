import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props){
    const productId= props.productId;
    const[isMessageopen,setMessageopen]=useState(false);
    const[isdeleting, setiddeleting]=useState(false);
    const relode=props.relode;

    async function handeldelete() {
        setiddeleting(true)
        const token= localStorage.getItem("token")
            axios.delete(import.meta.env.VITE_BACKEND_URI+"/product/"+productId,{
            headers:{
            Authorization:`Bearer ${token}`
        }
        }).then((res)=>{
            toast.success(res.data.message)
            setiddeleting(false)
            setMessageopen(false)
            relode();
        }).catch(()=>{
            toast.error(res.data.message);
            setiddeleting(false)
        })
        
    }
    return(
        <>
            <button onClick={()=>{setMessageopen(true)}} className="w-[80px] h-[50px] p-2 bg-red-500 hover:bg-red-700 text-white rounded-lg cursor-pointer">Delete</button>
            {isMessageopen&&<div className="w-[100vw] h-screen bg-black/35 fixed top-0 left-0 flex items-center justify-center">
                <div className="w-[500px] h-[300px] bg-white rounded-2xl relative flex items-center justify-center p-[10px] flex-col">
                    <button className="w-[50px] h-[50px] rounded-full bg-red-600 cursor-pointer hover:bg-red-800 absolute top-[-40px] right-[-40px] text-white font-bold" onClick={()=>{setMessageopen(false)}}>X</button>
                    <h1 className="text-2xl text-center">Are you sure you want to deletect product {productId} ?</h1>
                    <div className="flex justify-center gap-[50px] p-[20px]">
                        <button className="p-[10px] bg-red-600 cursor-pointer hover:bg-red-800 rounded-xl text-white " onClick={handeldelete} disabled={isdeleting}>Delete</button>
                        <button className="p-[10px] bg-gray-600 cursor-pointer hover:bg-gray-800 rounded-xl text-white" onClick={()=>{setMessageopen(false)}}>Cancel</button>
                    </div>
                </div> 
            </div>}
        </>
    )
}

{/* <button className="w-[80px] h-[50px] p-2 bg-red-500 hover:bg-red-700 text-white rounded-lg cursor-pointer" onClick={()=>{
    const token= localStorage.getItem("token")
    axios.delete(import.meta.env.VITE_BACKEND_URI+"/product/"+item.productId,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        toast.success(res.data.message)
        setloaded(false)
    })
}}>Delete</button> */}