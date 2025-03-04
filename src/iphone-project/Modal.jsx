import React from "react"
export function Modal({hidden})
{
    return (<>
    <div className="modal-container" style={{display:(hidden)?"block":"none"}} >
    
    <h1 className="modal-heading"  >Thanks for contacting us</h1>
  
    <p style={{}}>The ceo want to specifically thank you
        for your inquires and concerns
       
    </p>
    <button className="modal-button" >OK</button>
    </div>
    </>)
}