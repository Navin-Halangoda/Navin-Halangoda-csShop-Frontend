import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loder from "../../component/Loder";
import { GoVerified } from "react-icons/go";
import toast from "react-hot-toast";

export default function AdminUserpage(){
    const [user,setuser] = useState([]);
    const [loaded,setloaded]=useState(false)
    const token = localStorage.getItem("token")
    

    useEffect(()=>{
        
        if(!loaded){
        axios.get(import.meta.env.VITE_BACKEND_URI+"/user",{
             headers:{
                    Authorization: "Bearer "+token
                }
        }).then((res)=>{
            setuser(res.data)
            setloaded(true)
        })}
    },[loaded])


    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-primmary via-accent/10 to-primmary p-6 lg:p-10">
            {loaded?<div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-secondary mb-2">User Management</h1>
                    
                </div>

                {/* Table Container */}
                
                <div className="bg-white/80  rounded-2xl shadow-2xl border border-accent/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-accent2 to-accent text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">First Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Last Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"></th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"></th>
                                </tr> 
                            </thead>
                            <tbody className="divide-y divide-accent/10">
                                {user.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-secondary/40">
                                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-lg font-medium">No user found</p>
                                    
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    user.map((item, index)=>{
                                        return(
                                            <tr 
                                                key={index}
                                                className="hover:bg-accent/5 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center ">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm text-secondary/80 bg-accent/10 px-3 py-1 rounded-full flex flex-row gap-2 items-center">
                                                        {item.email}{item.isEmailVerified?<GoVerified className="text-blue-500"/>:""}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {item.firstName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {item.lastName}
                                                    </div>
                                                </td>
                                             
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent2">
                                                        {item.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-secondary/70">
                                                    {item.isBlocked?"Blocked":"Active"}
                                                </td>
                                                <td className="px-6 py-4 text-secondary/70 font-medium">
                                                    <button className="bg-accent2 text-md text-primmary p-2 hover:bg-accent2/90 rounded-2xl"
                                                    onClick={async()=>{
   
                                                        const res=await axios.post(import.meta.env.VITE_BACKEND_URI+`/user/toggle-block/${item.email}`,{
                                                            isBlocked:!item.isBlocked
                                                        },{
                                                          headers:{
                                                                Authorization: "Bearer "+token
                                                            }  
                                                        })
                                                        setloaded(false)
                                                        toast.success(res.data.message)
                                                    }}
                                                    >
                                                        {item.isBlocked?"Unblock user":"Block user"}
                                                    </button>
                                                </td>
                                                
                                            </tr> 
                                        )  
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Count Footer */}
                <div className="mt-6 text-center text-secondary/60">
                    <p className="text-sm">
                        Showing <span className="font-semibold text-secondary">{user.length}</span> user{user.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>:<Loder/>}
        </div>
    )
}