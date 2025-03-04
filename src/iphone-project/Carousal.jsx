import React from "react";
import Countdown from "react-countdown";
import iphone13 from "./assets/iphone13.jpg";
export function Carousal()
{
      
    const endDate=new Date("2024-12-25");

    return (<div className="carousal-container" >
    
        <div className="carousal-image">
           <img src={iphone13} alt="iphone data" />
        </div>

       <div className="carousal-sub-container" style={{width:"60%", display:"flex",lineHeight:"40px",padding:"50px",fontSize:"20px", alignItems:"center", justifyContent:"center",flexDirection:"column", textAlign:"justify"}}>
         <p style={{width:"100%"}}> 
            This is the latest release of iphone 16, buy it here before the timer goes off, you wouldn't see this kind of offer elsewhere, order now, while we deliver it to you in 24 hours</p>
       
        <div className="carousal-counter" style={{color:"red",fontSize:"50px",marginTop:"20px"}}>
          <Countdown date={endDate}/>
    
        </div>

        <div style={{marginTop:"10px"}}>
          <button style={{backgroundColor:"green", padding:"10px 8px",border:"none", borderRadius:"5px"}}>click here now !!!</button>
        </div>
        </div>

        
     </div>)
    
   
}