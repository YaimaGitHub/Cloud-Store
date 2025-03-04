import React from 'react'

export function ShareOnWhatsApp()
{
 
  const openingIntro="Hi, i have seen your iphone online store, and i'm interested in making inquiry about one of your devices";

   
     window.open("https://wa.me/+2348169301025?message="+`${openingIntro}`,"_whatsapp");
}

export function ModularizedShareOnWhatsApp()
{
  const productDetails={
           image:"",
           name:"null",
           id:"null",
           description:"product describe",
           price:`N ${5000}`
    };

   
     window.open("https://wa.me/+2348169301025","_whatsapp");
}
