import { Link, Route, Routes } from "react-router-dom";
import { FaRegRectangleList } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import Adminproduct from "./adminpages/Adminproduct.jsx";
import Adminaddproduct from "./adminpages/Adminaddproduct.jsx";
import Adminupdateproduct from "./adminpages/Adminupdateproduct.jsx";
import Adminorder from "./adminpages/Adminorder.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Loder from "../component/Loder.jsx";
import AdminUserpage from "./adminpages/AdminUserpages.jsx";

export default function Admin(){
    const[user,setuser]=useState(null);
    useEffect(()=>{
       const token = localStorage.getItem("token");
        if(token == null){
            window.location.href="/"
            return
        }
        axios.get(import.meta.env.VITE_BACKEND_URI+"/user/getuser",{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then((response)=>{
            if(response.data.role=="admin"){
                setuser(response.data);
            }else{
                window.location.href="/"
            }
            
        }).catch(()=>{
            window.location.href="/loging"; 
        })
    },[])
    return(
        <div>
            <div className="w-full h-screen max-h-ful flex flex-row bg-accent2">
                {user?
                <>
                <div className="w-[400px] bg-accent2">
                    <div className="w-full h-[100px] flex items-center">
                        <img src="/creative-computer-logo-template_23-2149201860.png" className="h-[150px]" />
                        <h1 className="text-2xl">Admin</h1>
                        <h1 className="text-2xl text-orange-500">Panel</h1>
                    </div>
                    <div className="w-full h-[400px] text-[25px] text-seccondary flex flex-col p-2 font-bold">
                        <Link to="/admin"className="w-full flex h-[50px] gap-[10px] items-center"><FaRegRectangleList/>Order</Link>
                        <Link to="/admin/product"className="w-full flex h-[50px] gap-[10px] items-center "><AiOutlineProduct/>Product</Link>
                        <Link to="/admin/user"className="w-full flex h-[50px] gap-[10px] items-center"><LuUsersRound/>User</Link>
                        <Link to="/admin/review"className="w-full flex h-[50px] gap-[10px] items-center"><MdOutlineRateReview/>Reviews</Link>
                    </div>
                </div>
                <div className="w-[calc(100%-400px)] h-full max-h-full overflow-y-scroll border-[10px] border-accent2 rounded-3xl bg-primmary">
                    <Routes>
                        <Route path="/" element={<Adminorder/>}/>
                        <Route path="/product" element={<Adminproduct/>}/>
                        <Route path="product/add-product" element={<Adminaddproduct/>}/>
                        <Route path="/product/update-product" element={<Adminupdateproduct/>}/>
                        <Route path="/user" element={<AdminUserpage/>}/>
                        <Route path="/review" element={<h1>review</h1>}/>
                    </Routes>
                </div>
                </>:<Loder/>}
            </div>
        </div>
    )
}