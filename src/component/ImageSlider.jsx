import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [activeindex,setactiveindex]=useState(0);
    return(
        <div className="w-full flex flex-col  item center">
            <div className="w-full flex justify-center">
            <img src={images[activeindex] }className="w-[80%] h-[550px]  object-contain"/></div>
             <div className=" w-full h-[150px] flex flex-row justify-center gap-4 ">
                {
                    images.map((images,index)=>{
                        return(
                            <img src={images} className={"w-[90px] h-[90px] object-cover rounded-lg "+((activeindex==index)?"border-2 border-accent2":" ")} onClick={()=>{
                                setactiveindex(index)
                            }}/>
                        )
                    })
                }
             </div>
        </div>
        
    )
}