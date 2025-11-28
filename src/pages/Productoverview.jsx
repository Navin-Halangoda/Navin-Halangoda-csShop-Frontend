import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import Loder from '../component/Loder';
import ImageSlider from '../component/ImageSlider.jsx';
import { IoMdArrowDropright } from 'react-icons/io';
import { addtocart, emptycart, getcart } from '../utils/cart.js';


export default function Productoverview() {
    const navigate= useNavigate()
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
        status=="success"&&<div className='w-full h-[calc(100vh-100px)] flex lg:flex-row flex-col'>
          <h1 className='text-4xl font-semibold lg:hidden text-center sticky top-0'>{product.name}</h1>
            <div className='lg:w-1/2 w-full h-full flex justify-center items-center'>
                 <ImageSlider images={product.images}/>
            </div>
            <div className='lg:w-1/2v w-full h-full flex flex-col gap-6 pt-3.5 lg:pl-0 pl-2w'>
            <h1 className='text-4xl font-semibold hidden lg:block'>{product.name}</h1>
            <h2 className='text-lg text-secondary/85'>{product.productId}</h2>
            <h3 className='text-lg flex items-center text-secondary/90'> <IoMdArrowDropright/> {product.category}</h3>
            {
              product.altname&&product.altname.length>0&&(
                <h3 className='text-md text-black/80'>
                  {product.altname.join("|")}
                </h3>
              )
            }
            <p className='text-md text-justify text-secondary/90  overflow-y-auto '>{product.description}</p>
            {
              product.lablledPrice>product.price&&(
                <h2 className='text-secondary/90 line-through decoration-2 decoration-accent2 text-xl mr-2 ' >LKR. {product.lablledPrice.toFixed(2)}</h2>
              )
            }
            <h2 className='text-accent font-semibold text-3xl'>{product.price.toFixed(2)}</h2>
            <div className='flex flex-row gap-2'>
              <button className='p-3 bg-accent2 text-primmary border-2 border-accent2 hover:text-accent2 hover:bg-transparent'onClick={()=>{
                addtocart(product,1)
              }}>Add to cart</button>
               <button 
               onClick={()=>{
                navigate("/checkout",{state:[{
                  productId:product.productId,
                  name:product.name,
                  price:product.price,
                  lablledPrice:product.lablledPrice,
                  image:product.images[0],
                  quantity:1
                }]})
               }}
               className='p-3 text-accent2 border-2 border-accent2 hover:text-primmary hover:bg-accent2'
               >Buy now</button>
            </div>
            </div>

        </div>
      }
    </div>
  )
}
