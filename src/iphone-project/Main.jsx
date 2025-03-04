import React, { useEffect, useState } from "react";
import { Carousal } from "./Carousal";
import { FeaturedProducts } from "./FeaturedProducts";
import { Testimony } from "./Testimony";
import { ShareOnWhatsApp } from "./whatsapp/whatsapp";
import whatsapp from "./assets/whatsapp-icon.png";

export function Main()
    {
        const [hasNotification, setHasNotification] =useState(false);

        useEffect(()=>
            {
                //simulate recieving notification every 5 seconds
                const intervalId=setInterval(() => {
                    
                    setHasNotification(true);

                    setTimeout(() => {
                        setHasNotification(false); //blink
                    }, 2000);
                }, 5000);

                return ()=>clearInterval(intervalId);
            })
        
        return <div>

            <Carousal/>
            <h2 className="main-heading-for-iphone" > Featured Iphones</h2>
            <span><em>  scroll right to see other options</em></span>
            <FeaturedProducts/>
 
        <h2 className="main-heading-testimony" > What other customers are saying about us !!!</h2>

             <div className={`main-image ${hasNotification ? 'blink' : ''}`} >
            <img   src={whatsapp} onClick={ShareOnWhatsApp} alt="customer support" width={"50"} height={"50"}  />
            </div>
            <Testimony/>
              </div>
    }