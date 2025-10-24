import { Link } from "react-router-dom";

export default function Header(){
   return(
    <div className="h-[100px] w-full bg-accent flex flex-row">
        <img src="creative-computer-logo-template_23-2149201860.png" className="w-[120px]" />
        <div className="w-full h-full text-seccondary flex justify-center items-center text-xl gap-[30px]">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/abouth">Abouth us</Link>
            <Link to="/contact">Contact us</Link>
        </div>
    </div>
   ) 
}