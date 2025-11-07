import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Loder from '../component/Loder';

export default function Productoverview() {
    const params = useParams();
    const[product,setproduct]=useState();
    const[status,setstatus]=useState("loading")//loading,succes,error
    console.log(params.productId);
    

    useEffect(()=>{
        if(status=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URI+"/product/getbyid/"+params.productId).then(
                (res)=>{
                    setproduct(res.data)
                    setstatus("success")
                }
            ).catch((err)=>{
                toast.error("error fetching data")
                setstatus("error")
                
            })
        }
    },[])

  return (
    <div>
      {
        status=="loading"&&<Loder/>
      }
      {
        status=="error"&&<h1 className='text-center mt-10 text-lg'>Eroor loading product</h1>
      }
      {
        status=="success"&&<div className='w-full h-[calc(100vh-150px)] flex'>
            <div className='w-1/2 h-full flex items-center justify-center'><img src={product.images[0]} className='w-[300px] h-[300px]'/></div>
            <div className='w-1/2 h-full flex  justify-center'>
            <h1 className='text-lg font-bold p-4'>{product.name}</h1>
            </div>

        </div>
      }
    </div>
  )
}
