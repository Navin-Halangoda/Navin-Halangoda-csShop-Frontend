import { Link, Route, Routes } from "react-router-dom";
import { FaRegRectangleList } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";

export default function Admin(){
    return(
        <div>
            <div className="w-full h-screen max-h-ful flex flex-row bg-accent">
                <div className="w-100 bg-accent">
                    <div className="w-full h-[100px] flex items-center">
                        <img src="/creative-computer-logo-template_23-2149201860.png" className="h-[150px]" />
                        <h1 className="text-2xl">Admin</h1>
                        <h1 className="text-2xl text-orange-500">Panel</h1>
                    </div>
                    <div className="w-full h-[400px] text-[25px] text-secondary flex flex-col p-2">
                        <Link to="/admin"className="w-full flex h-[50px] gap-[10px] items-center"><FaRegRectangleList/>Order</Link>
                        <Link to="/admin/product"className="w-full flex h-[50px] gap-[10px] items-center "><AiOutlineProduct/>Product</Link>
                        <Link to="/admin/user"className="w-full flex h-[50px] gap-[10px] items-center"><LuUsersRound/>User</Link>
                        <Link to="/admin/review"className="w-full flex h-[50px] gap-[10px] items-center"><MdOutlineRateReview/>Reviews</Link>
                    </div>
                </div>
                <div className="w-[calc(100%-100px)] h-full max-h-full overflow-y-scroll border-[10px] border-accent rounded-3xl bg-primmary">
                    <Routes>
                        <Route path="/" element={<h1>order</h1>}/>
                        <Route path="/product" element={<h1>product</h1>}/>
                        <Route path="/user" element={<h1>user</h1>}/>
                        <Route path="/review" element={<h1>review</h1>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}