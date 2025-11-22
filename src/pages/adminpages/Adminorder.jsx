import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loder from "../../component/Loder";
import Vieworderinfo from "../../component/Vieworderinfo";

export default function Adminorder(){
    const [orders,setorders] = useState([]);
    const [loaded,setloaded]=useState(false)
    const token = localStorage.getItem("token")

    useEffect(()=>{
        if(!loaded){
        axios.get(import.meta.env.VITE_BACKEND_URI+"/orders",
            {headers:{
                    Authorization: "Bearer "+token
                }}
        ).then((res)=>{
            setorders(res.data)
            setloaded(true)
        })}
    },[loaded])


    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-primmary via-accent/10 to-primmary p-6 lg:p-10">
            {loaded?<div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-secondary mb-2">Product Management</h1>
                    <p className="text-secondary/60">Manage your product inventory and details</p>
                </div>

                {/* Table Container */}
                
                <div className="bg-white/80  rounded-2xl shadow-2xl border border-accent/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-accent2 to-accent text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Order Id</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Customer Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Customer Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                                </tr> 
                            </thead>
                            <tbody className="divide-y divide-accent/10">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-secondary/40">
                                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-lg font-medium">No Orders found</p>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order, index)=>{
                                        return(
                                            <tr 
                                                key={order.orderId}
                                                className="hover:bg-accent/5 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm text-secondary/80 bg-accent/10 px-3 py-1 rounded-full">
                                                        {order.orderId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {order.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {order.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {new Date(order.date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {order.status}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {order.total.toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    <div className=" gap-2 flex" >
                                                    <Vieworderinfo order={order}/>
                                                    
                                                    </div>
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
                        Showing <span className="font-semibold text-secondary">{orders.length}</span> product{orders.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>:<Loder/>}

            {/* Floating Add Button */}
            <Link 
                to="add-product" 
                className="fixed right-8 bottom-8 w-16 h-16 flex items-center justify-center text-4xl rounded-full bg-gradient-to-r from-accent2 to-accent text-white shadow-2xl hover:shadow-accent2/50 hover:scale-110 transform transition-all duration-300 group border-2 border-white/20"
            >
                <BiPlus className="group-hover:rotate-90 transition-transform duration-300"/>
            </Link>
        </div>
    )
}