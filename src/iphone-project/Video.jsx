import React from "react"
import testimony from "./assets/review.mp4";
export function Video()
{
    return ( <div className="video-container" >
        <video className="video-itself" src={testimony} autoPlay loop controls ></video>
    </div>)
}