import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductDeleteButton from "../../component/ProductDleteButoon";
import Loder from "../../component/Loder";

export default function Adminproduct(){
    const [products,setproduct] = useState([]);
    const [loaded,setloaded]=useState(false)

    useEffect(()=>{
        if(!loaded){
        axios.get(import.meta.env.VITE_BACKEND_URI+"/product").then((res)=>{
            setproduct(res.data)
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Labeled Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Model</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Brand</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                                </tr> 
                            </thead>
                            <tbody className="divide-y divide-accent/10">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-secondary/40">
                                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-lg font-medium">No products found</p>
                                                <p className="text-sm mt-1">Add your first product to get started</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((item, index)=>{
                                        return(
                                            <tr 
                                                key={item.productId}
                                                className="hover:bg-accent/5 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center border border-accent/20">
                                                        {item.images && item.images[0] ? (
                                                            <img 
                                                                src={item.images[0]} 
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <svg className="w-8 h-8 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm text-secondary/80 bg-accent/10 px-3 py-1 rounded-full">
                                                        {item.productId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-secondary max-w-xs truncate">
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-accent2">
                                                        ${item.price}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-secondary/60 line-through">
                                                        ${item.lablledPrice}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent2">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-secondary/70">
                                                    {item.model}
                                                </td>
                                                <td className="px-6 py-4 text-secondary/70 font-medium">
                                                    {item.brand}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                        item.stock > 10 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : item.stock > 0 
                                                            ? 'bg-yellow-100 text-yellow-700' 
                                                            : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        {item.stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            item.isAvailable ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></div>
                                                        <span className={`text-sm font-medium ${
                                                            item.isAvailable ? 'text-green-700' : 'text-red-700'
                                                        }`}>
                                                            {item.isAvailable ? 'Available' : 'Unavailable'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    <div className=" gap-2 flex" >
                                                    <Link to="update-product" className="p-[8px] px-3 rounded-xl bg-accent hover:bg-accent2" state={item}>Edit</Link>
                                                    <ProductDeleteButton productId={item.productId} relode={()=>{setloaded(false)}}/>
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
                        Showing <span className="font-semibold text-secondary">{products.length}</span> product{products.length !== 1 ? 's' : ''}
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