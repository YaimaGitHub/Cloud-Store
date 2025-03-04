import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
export function ReviewStar()
{
    const group=useMemo(()=>[...Array(5)],[]);
    return (<div className="reviewstar-container" >
        {
           group.map((n,i)=><FaStar key={i} color={4>i?"green":"gray"}/>)
           
        }
        </div>)
}