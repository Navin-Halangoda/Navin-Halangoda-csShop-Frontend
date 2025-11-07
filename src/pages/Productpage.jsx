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
     {!loaded?<Loder/>:<div className='w-full  flex p-4 justify-center gap-[50px] flex-wrap'>
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

