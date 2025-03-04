import React from "react";
import { useState } from "react";
import { Video } from "./Video";
import { BeforeVideo } from "./BeforeVideo";
import { ReviewStar } from "./ReviewStar";

const data=[
    {
        review:"I generally have a distrust of online purchase, due to other websites and ecommerce delivering a substandard product from what was advertise. I contacted the team personally, via whatsapp, i was able to talk to the representative directly, and was assured that my need will be met in according to detail. a new model iphone 512 GB black arrived abuja the next day. i was impressed with the speed of delivery and great customer support",
        contact:"+23408532344"
    },
{
    review: "I have known david for a period lasting 20 years, an exceptional gentle man, his dream to bridge the gap between customers and business is erudite. one of which is first placing priority on speed of delvery, compared with other ecommerce, which might take weeks to deliver, his goal is to deliver products as quickly as possible by partnering with dedicated logistic people. Clarity of commuication, meaning he wouldnt sell you a damage phone as new, new phone is new phone. In the event of delay, priority is given to updating customers.",
    contact: "@+23408532344"
}]

function Stories()
{
   return <div className="stories-container" style={{width:"60%", textAlign:"justify", padding:"0 20px"}}>

    <div >
     <span className="stories-name" style={{fontWeight:"bold"}}>Martins. O.</span>
 <span><ReviewStar/></span>
     <p>i generally have a distrust of online purchase, due to other websites and ecommerce delivering a different product from what was advertise.
         i contacted the team personally, via whatsapp, i was able to talk to the ceo directly, and was assured that my need will be met in according to detail.
         a new model iphone 512 GB black arrived abuja the next day. i was impressed with the speed of delivery and great customer support.
     </p>
     <p>want prove to this story, talk to martins <span style={{fontWeight:"bolder"}}>+23408532344</span></p>
    </div>

    <div className="" style={{marginTop:"20px"}}>
     <span className="" style={{fontWeight:"bold"}}>David Paris.</span>
     <span><span><ReviewStar/></span></span>
     <p>
         i have known david for a period lasting 20 years, an exceptional gentle man, his dream to bridge the gap between customers and business is erudite.
         one of which is first placing priority on speed of delvery, compared with other ecommerce, which might take weeks to deliver, his goal is to deliver products as quickly as possible by partnering with dedicated logistic people.
         clarity of commuication, meaning he wouldnt sell you a damage phone as new, new phone is new phone. In the event of delay, priority is given to updating customers.
         
     </p>
   
     
     <p>want prove to this story, talk to martins at <span style={{fontWeight:"bolder"}}> @+23408532344</span></p>
    </div>
 </div> 

}


export function Testimony()
{
    const [change, setChange]=useState(true)

    return (<div className="testimony-container" >
   
    <Stories/>

    <div className="testimony-changer" >
    { 
        (change)? <BeforeVideo  setChange={setChange(change=>!change)}/> : <Video/>
     }</div>
 
    </div>)
}