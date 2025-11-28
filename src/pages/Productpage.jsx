import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loder from '../component/Loder';
import Productcard from '../component/Productcard.jsx';

export default function Productpage() {
    const[product,setproduct]=useState("");
    const[loaded,setladed]=useState(false);
    

    useEffect(()=>{
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URI+"/product").then((res)=>{
                setproduct(res.data);
                setladed(true);
            })
        }
    },[])

  return (
    <div className='w-full h-[calc(100vh-100px)]'>
     {!loaded?<Loder/>:<div className='w-full  flex p-4 justify-center gap-[50px] flex-wrap '>
      <div className='w-full h-[100px] sticky top-0 bg-white flex justify-center items-center'>
        <input
        type='text'
        placeholder='Search product....'
        className='w-1/2 px-4 border border-black/30 rounded-lg outline-none'
        onChange={async(e)=>{if(e.target.value==""){
          setladed(false)
          await axios.get(import.meta.env.VITE_BACKEND_URI+"/product").then((res)=>{
                setproduct(res.data);
                setladed(true);
            })
        }else{
          
           await axios.get(import.meta.env.VITE_BACKEND_URI+"/product/searchproduct/"+e.target.value).then((res)=>{
                setproduct(res.data);
                setladed(true);
            })
        }}

        
      }
        />
      </div>
        {
            product.map((item)=>{
            return(
                <Productcard key={item.id} product={item}/>
              )
            })
            
        }
     </div>
     }
    </div>
  )
}

