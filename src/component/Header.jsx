import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { LuListCollapse } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header(){
    const[sidebaropen,setsidebaropen]=useState(false)
   return(
    <div className="h-[100px] w-full bg-accent flex flex-row relative items-center">
        <LuListCollapse onClick={()=>{setsidebaropen(true)}} className="text-white text-2xl my-auto ml-1 lg:hidden font-bold"/>
        <img src="creative-computer-logo-template_23-2149201860.png" className="w-[120px]" />
        <div className="w-full h-full text-seccondary lg:flex hidden justify-center items-center text-xl gap-[30px]">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/abouth">Abouth us</Link>
            <Link to="/contact">Contact us</Link>
        </div>
        <Link to='/cart' className="text-center text-white text-2xl p-3 absolute right-4 top-1/2 -translate-y-1/2"><CgShoppingCart/></Link>
        {sidebaropen&&<div className="w-[100vw] h-screen fixed left-0 top-0 bg-black/50 transition-all duration-300 z-20 lg:hidden">
        <div className="w-[250px] h-screen  relative">
            <div className="absolute w-full h-full bg-white left-[-250px] transform-flat translate-x-[250px] transition-transform duration-1000 flex flex-col">
            <div className="h-[100px] w-full bg-accent flex flex-col">
                <div className="flex flex-row">
                <LuListCollapse onClick={()=>{setsidebaropen(false)}} className="text-white rotate-180 my-auto text-2xl ml-1"/>
                <img src="creative-computer-logo-template_23-2149201860.png" className="w-[120px]" />
                </div>
                <div className="flex h-screen gap-5 flex-col text-xl items-center justify-center font-bold mt-2">
                <a href="/" onClick={()=>{setsidebaropen(false)}}>Home</a>
                <a href="/product" onClick={()=>{setsidebaropen(false)}}>Product</a>
                <a href="/aboth" onClick={()=>{setsidebaropen(false)}}>Abouth</a>
                <a href="/contact" onClick={()=>{setsidebaropen(false)}}>Contact</a>
                </div>
                
          
            </div>
            </div>
        </div>
        </div>}
    </div>
   ) 
}