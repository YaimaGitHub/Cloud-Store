import React from "react";
import whatsapp from "./assets/whatsapp-icon.png";
import { iphones } from "./iphones";

function ProductDetail({product})
{
    return <>
    {
        product.map((n,i)=>(<li key={i}>{n}</li>))
    }
    </>
}
export function FeaturedProducts()
{
   // brief discriptionnest <div>Testimony</div>
     //       call to action:whatsapp us now:
       //     direct payment
         //   payment system only avail if customer login
    return <div className="featuredproduct-container" >
            <div className="featuredproduct-inner-container" >
                {
                    iphones.map((product,index)=>
                    <div className="featuredproduct-box"  key={index} >
                            
                             <div className="featuredproduct-box-image"  >
                                <img src={product.image} alt={product.name} />
                            </div>
                           
                             <div >
                                 <h2 className="featuredproduct-box-heading"  >{product.name}</h2>
                                 <ul className="featuredproduct-box-ul" >
                                   {
                                    <ProductDetail product={[...product.desc]}/>
                                   }
                                    </ul>
                                  
                                 <div className="featuredproduct-final-box" >
                                    <span className="featuredproduct-final-price" >${product.price}</span>
                                    <button className="featuredproduct-final-button" >
                                        <img src={whatsapp} alt="contact" width={20} /> BUY NOW</button>
                                 </div>
                             </div>
                    </div> )
                }
            </div>
</div>
}