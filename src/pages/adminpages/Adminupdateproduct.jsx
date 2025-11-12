import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UploadFile from "../../utils/mediaUpload";

export default function Adminupdateproduct(){
    const location = useLocation();
    
    const[productId,setproductId]= useState(location.state.productId);
    const[name,setname]= useState(location.state.name);
    const[altname,setaltname]= useState(location.state.altname.join(","));
    const[description,setdescription]= useState(location.state.description);
    const[price,setprice]= useState(location.state.price);
    const[lablledPrice,setlablledPrice]= useState(location.state.lablledPrice);
    const[files,setfiles]= useState([]);
    const[category,setcategory]= useState(location.state.category);
    const[model,setmodel]= useState(location.state.model);
    const[brand,setbrand]= useState(location.state.brand);
    const[stock,setstock]= useState(location.state.stock);
    const[isAvailable,setisAvailable]= useState(location.state.isAvailable);
    const navigate=useNavigate()

    if(!location.state){
        window.location.href="/admin/product"
    }

    async function updateproduct(){
        const token= localStorage.getItem("token");
        if(token==null){
            toast.error("you must loged to admin update product");
            navigate("/loging")
            return;
        }
       
        const imagepromise=[]

        for(let i=0;i<files.length; i++){
            const promise= UploadFile(files[i])
            imagepromise.push(promise)
        }

        let images= await Promise.all(imagepromise)

        if(images.length==0){
            images=location.state.images
        }
       
        if(productId==""||name==""||description==""||lablledPrice==""||model==""||brand==""||category==""){
            toast.error("please fill all blanks");
            return;
        }
        try{
            const altnameArray = altname.split(",");
            await axios.put(import.meta.env.VITE_BACKEND_URI+"/product/"+productId,{
                name:name,
                altname:altnameArray,
                description:description,
                price:price,
                lablledPrice:lablledPrice,
                images:images,
                category:category,
                model:model,
                brand:brand,
                stock:stock,
                isAvailable:isAvailable
            },{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            toast.success("product updated succefuly");
            navigate("/admin/product")

        }catch(err){
            toast.error("error updating product. please try again.")
            console.log(err);
            console.log("error ading products.");
            
            
        }
    }

    return(
        <div className="w-full min-h-full flex justify-center p-[40px] overflow-y-scroll">
            <div className="w-[800px] bg-accent rounded-3xl p-[30px] ">
                <h1 className="w-full text-[25px] text-secondary mb-[10px] font-bold gap-[10px] flex items-center"><AiOutlineProduct/> Update product</h1>
                <div className="bg-primmary p-[20px] w-full flex flex-wrap justify-between rounded-xl shadow-2xl">
                    <div className="my-[10px] w-[45%]">
                        <label>Product Id</label>
                        <input type="text" value={productId} 
                            disabled
                            onChange={(e)=>{setproductId(e.target.value)}} 
                            className="w-full h-[40px] rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px]"/>
                        
    
                    </div>
                    <div className="my-[10px] w-[45%]">
                        <label>Name</label>
                        <input type="text" value={name} 
                            onChange={(e)=>{setname(e.target.value)}} 
                            className="w-full h-[40px] rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px]"/>
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Alternative names</label>
                        <input type="text" value={altname} 
                            onChange={(e)=>{setaltname(e.target.value)}} 
                            className="w-full h-[40px] rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px]"/>
                            <p className="w-full text-gray-500 text-right text-sm">Seperate multiple name with comma</p>
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Description</label>
                        <textarea value={description} 
                            onChange={(e)=>{setdescription(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/>
                            
                    </div>
                    <div className="my-[10px] w-[45%]">
                        <label>Price</label>
                        <input type="number" value={price} 
                            onChange={(e)=>{setprice(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/>      
                    </div>
                    <div className="my-[10px] w-[45%]">
                        <label>labbled Price</label>
                        <input type="number" value={lablledPrice} 
                            onChange={(e)=>{setlablledPrice(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/> 
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Images</label>
                        <input type="file" multiple={true} 
                            onChange={(e)=>{setfiles(e.target.files);
                            }} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/> 
                        <p className="w-full text-gray-500 text-right text-sm">Seperate multiple name with comma</p>
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Category</label>
                        <select value={category} onChange={(e)=>{setcategory(e.target.value)}}  className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px]">
                            <option value="" disabled hidden> Select Category  </option>
                            <option value="CPU">CPU</option>
                            <option value="Grapic card">Grapic card</option>
                            <option value="Storage devices">Storage devices</option>
                            <option value="Monitor">Moniter</option>
                            <option value="computer">Computer</option>
                            <option value="Accesories">Accesories</option>
                            <option value="cable">Cable</option>
                            <option value="power suppliers">power suppliers</option>
                            <option value="Moues and keyboards">Moues and keyboards</option>
                            <option value="Ram">Ram</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Model</label>
                        <input type="text" value={model} 
                            onChange={(e)=>{setmodel(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/> 
                    </div>
                     <div className="my-[10px] w-[30%]">
                        <label>Brand</label>
                        <input type="text" value={brand} 
                            onChange={(e)=>{setbrand(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/> 
                    </div>
                     <div className="my-[10px] w-[45%]">
                        <label>Stock</label>
                        <input type="number" value={stock} 
                            onChange={(e)=>{setstock(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] "/> 
                    </div>
                     <div className="my-[10px]  w-[45%]">
                        <label>Available</label>
                        <select value={isAvailable} 
                            onChange={(e)=>{setisAvailable(e.target.value)}} 
                            className="w-full  rounded-2xl border border-seccondry focus:outline-none focus:ring-2 focus:ring-accent2 p-[10px] ">
                            <option value="true">yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <button className="w-[49%] h-[50px] bg-red-500 text-primmary text-[20px] border-2 border-red-500 hover:bg-transparent hover:text-secondary rounded-2xl mt-1.5"><Link to="/product" >Cansel</Link></button>
                    <button
                    onClick={updateproduct}
                     className="w-[49%] h-[50px] bg-accent2 text-[20px] text-primmary border-2 border-accent2 hover:bg-transparent hover:text-secondary rounded-2xl mt-1.5" >Update product</button>
                    
                </div>
            </div>
        </div>
    )
}