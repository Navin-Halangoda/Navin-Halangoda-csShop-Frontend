import { useState } from "react"
import { BsChevronUp } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Checkout() {
    const location = useLocation();
    const navigate =useNavigate();
    const [cart,setcart]=useState(location.state);

    if(location.state== null){
        navigate("/products")
    }
    
    function getcarttotal(){
        let total=0;
        cart.forEach((item)=>{
            total+= item.price*item.quantity
        })
        return total
    }
  return (
    <div className="w-full flex flex-col items-center p-[20px]">
        {cart.map((item,index )=>{
            return(
                <div className="w-[50%] h-[150px] rounded-2xl overflow-hidden shadow-2xl my-1 flex justify-between ">
                    <img src={item.image} className="h-full aspect-square object-cover"/>
                    <div className="flex flex-col justify-center p-4 w-[300px] ">
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
                    <div className="h-full flex flex-row items-center gap-4">
                        <div className="h-full flex flex-col justify-center items-center">
                            <BsChevronUp className="text-2xl cursor-pointer hover:text-accent transition" onClick={()=>{
                               const copiedcart =[...cart]
                               copiedcart[index].quantity+=1
                               setcart(copiedcart)
                            }
                            }/>
                            <span className="text-lg">{item.quantity}</span>
                            <BsChevronUp className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
                            onClick={()=>{
                                const copiedcart = [...cart]
                                copiedcart[index].quantity-=1
                                if(copiedcart[index].quantity<1){
                                    copiedcart.splice(index,1)
                                }
                                setcart(copiedcart)
                            }}/>
                        </div>
                        <span className="pr-4 text-lg font-semibold w-[150px] text-right">LKR.{item.quantity*item.price.toFixed(2)}</span>
                        
                    </div>       

                </div>
            )
        })
        }
        <div className="w-[50%] h-[150px] rounded-2xl overflow-hidden shadow-2xl my-1 flex justify-between items-center ">
            <button
             to="/checkout" className="self-center ml-4 px-6 py-3 rounded bg-accent text-white transition hover:bg-accent/90" state={cart}>
                Order Now</button>
            <span className="pr-4 text-xl font-semibold  text-right">LKR.
                {getcarttotal().toFixed(2)}
                </span>
            

        </div>
       
    </div>
  )
}
