import { useState } from "react"
import { addtocart, getcart, getcarttotal } from "../utils/cart"
import { BsChevronUp } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Cart() {
    const [cart,setcart]=useState(getcart())
  return (
    <div className="w-full flex flex-col items-center p-[20px]">
        {cart.map((item,index)=>{
            return(
                <div key={index} className="w-full lg:w-[50%] p-[30px] relative lg:h-[150px] h-full rounded-2xl overflow-hidden shadow-2xl my-1 flex justify-between ">
                    <h1 className="lg:hidden absolute top-0 h-[30px] w-full overflow-hidden font-bold">{item.name}</h1>
                    <div className="flex flex-col h-full">
                    <img src={item.image} className="lg:h-full h-[100px] aspect-square object-cover"/>
                    {
                        item.lablledPrice>item.price&&(
                            <h2 className='lg:hidden text-secondary/90 line-through decoration-2 decoration-accent2 text-md mr-2  ' >LKR. {item.lablledPrice.toFixed(2)}</h2>
                        )
                    }
                    <h2 className="text-lg font-semibold text-secondary lg:hidden">LKR.{item.price}</h2>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center p-4 w-[300px]">
                        <h1 className="text-xl text-secondary font-semibold relative hover:[&_.tooltip]:opacity-100">
                        <span className="italic tooltip text-sm text-primmary bg-accent2 rounded-xl p-1 absolute bottom-[-35px] left-0 min-w-[150px] opacity-0">{item.name}</span>
                        {item.name.length>20?
                        item.name.substring(0,20)+"....":
                        item.name
                        }</h1>
                         {
                            item.lablledPrice>item.price&&(
                                <h2 className='text-secondary/90 line-through decoration-2 decoration-accent2 text-lg mr-2 ' >LKR. {item.lablledPrice.toFixed(2)}</h2>
                            )
                            }
                        <h2 className="text-lg font-semibold text-secondary">LKR.{item.price}</h2>
                        <h3 className="text-sm text-secondary/70">{item.productId}</h3>
                    </div>
                    <div className=" flex flex-row items-center justify-center gap-4 min-h-full ml-1">
                        <div className="h-full flex flex-col justify-center items-center">
                            <BsChevronUp className="text-2xl cursor-pointer hover:text-accent transition" onClick={()=>{
                                addtocart(item,1)
                                const newcart= getcart();
                                setcart(newcart)
                            }
                            }/>
                            <span className="text-lg">{item.quantity}</span>
                            <BsChevronUp className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
                            onClick={()=>{
                                addtocart(item,-1)
                                const newcart= getcart();
                                setcart(newcart)
                            }}/>
                        </div>
                        <span className="pr-4 text-lg font-semibold w-[150px] text-right">LKR.{item.quantity*item.price.toFixed(2)}</span>
                        
                    </div>       

                </div>
            )
        })
        }
        <div className="lg:w-[50%] lg:h-[150px] h-full w-full rounded-2xl overflow-hidden shadow-2xl my-1 flex justify-between items-center ">
            <Link
             to="/checkout" className="text-center ml-4 my-2 px-2 py-2 rounded bg-accent text-white transition hover:bg-accent/90" state={cart}>Continue shoping</Link>
            <span className="pr-4 text-xl font-semibold  text-right">LKR.{getcarttotal().toFixed(2)}</span>
            

        </div>
      
    </div>
  )
}
