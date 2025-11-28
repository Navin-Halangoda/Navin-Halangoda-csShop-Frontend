import { Route, Routes } from "react-router-dom";
import Header from "../component/Header.jsx";
import Productpage from "./Productpage.jsx";
import Productoverview from "./Productoverview.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import Orderspage from "./Orderspage.jsx";

export default function Homepage(){
    return(
        <div className="w-full h-full max-h-full overflow-y-scroll">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                    <Route path="/" element={<h1>home</h1>}/>
                    <Route path="/abouth" element={<h1>abouth us</h1>}/>
                    <Route path="/contact" element={<h1>contact</h1>}/>
                    <Route path="/product" element={<Productpage/>}/>
                    <Route path="/overview/:productId" element={<Productoverview/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/orders" element={<Orderspage/>}/>
                    <Route path="/*" element={<h1>page not found</h1>}/>
                </Routes>
            </div>            
        </div>
    )
}    