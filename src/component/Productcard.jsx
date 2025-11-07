import { Link } from "react-router-dom";

export default function Productcard(props){
  const product= props.product
    return(
    <div className="w-[300px] h-[400px] shadow-2xl m-4 relative cursor-pointer hover:[&_.button]:opacity-100 hover:[&_.primaryimage]:opacity-0">
      <div className="w-[300px] h-[250px] relative">
        <img src={product.images[1]} className="w-full h-[250px] object-cover absolute bg-white"/>
         <img src={product.images[0]} className="w-full h-[250px] object-cover bg-white absolute primaryimage transition-opacity duration-300 "/>
      </div>
      <div className="flex flex-col w-full h-[150px] justify-between p-2 ">
         <h2 className="text-center text-lg p-0.5">{product.name}</h2>
         <div className="flex flex-col w-full items-center ">
          {
           product.lablledPrice>product.price&&
           <h1 className="line-through mx-0.5 decoration-accent decoration-2 ">LKR.{product.lablledPrice.toFixed(2)}</h1>
          }
          <h1 className="text-lg">LKR.{product.price.toFixed(2)}</h1>
         </div>
         
      </div>
      <div className="w-full h-[150px] bg-white absolute bottom-0 button opacity-0 transition-opacity duration-300 flex items-center justify-center">
        <Link to={"/overview/"+product.productId} className="flex items-center justify-center w-[150px] h-[50px] border-2 border-accent2 text-accent2 hover:bg-accent2 hover:text-white transition-colors duration-200">View Details</Link>
      </div>
    </div>
    );
}