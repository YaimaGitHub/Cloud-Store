import React from 'react'
import {FaPlay, FaPlayCircle, FaStar} from 'react-icons/fa'
import suya from "./assets/suya.jpg";
export function BeforeVideo({setChange=f=>f})
{
  
    return(<div>
        <p className='beforevideo-paragraph' > fufilled by ukmart</p>
          <img className='beforevideo-img' src={suya} alt="image of product" />
           <button className='beforevideo-button' onClick={()=>setChange()} > <FaPlayCircle/> Our Story </button>
         </div>)
}