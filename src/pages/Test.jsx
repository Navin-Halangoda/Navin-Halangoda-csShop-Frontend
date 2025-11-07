import React, { useState } from 'react'
import UploadFile from '../utils/mediaUpload.js';


export default function Test() {
  const[files,setfiles]=useState(null)

  async function handelfile(){
    const url=await UploadFile(files)
    console.log(url);
    
  }
  return (
    <div className='w-full h-full flex items-center justify-center' >
      <input type='file' onChange={(e)=>{
        setfiles(e.target.files[0])
      }}/>

      <button className='p-[20px] bg-accent hover:bg-blue-700' onClick={handelfile}>Upload</button>
    </div>
  )
}
