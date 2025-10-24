import { useState } from "react";
import "./test.css"
export default function Test(){
    const [count,setcount]= useState(0)
    const [status,setatus]=useState("🌞")
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className=" w-[500px] h-[400px] shadow-2xl flex justify-center items-center">
                <button className="w-[150px] h-[50px] bg-red-500 text-white" onClick={()=>{
                    setcount(count-1)
                    console.log(count);
                    
                    
                }}> Decreement</button>
                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>
                <button className="w-[150px] h-[50px] bg-blue-500 text-white" onClick={()=>{
                    setcount(count+1)
                    console.log(count);
                    
                }}> INcreement</button>
            </div>
            <div className=" flex flex-col w-[500px] h-[400px] shadow-2xl flex justify-center items-center">
                <span className="w-[30px] h[30px] font-bold text-2xl">{status}</span>
                <div className="w-full h-[50px] flex justify-center">
                    <button className="w-[100px] h-full text-white bg-red-600" onClick={()=>{setatus("🌚")}}>Off</button>
                    <button className="w-[100px] h-full text-white bg-green-600" onClick={()=>{setatus("🌞")}}>ON</button>
                </div>
            </div>
        </div>
    )
}