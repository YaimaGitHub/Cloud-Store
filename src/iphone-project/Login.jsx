import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
export function Login({submitForm, email, setEmail=f=>f, text, setText=f=>f}) {

    
    const [hide, setHide]=useState(true);
   useEffect(()=>
    {
            setHide(!hide);
    },[])

    return<> <form action="POST" onSubmit={submitForm} className="Login-container" >
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" className="Login-email" placeholder="input email" value={email}  onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="message">Message:</label>
       <textarea name="message" id="message" placeholder="message us/patner with us" value={text} onChange={(e) => setText(e.target.value)} ></textarea>

        <button type="submit" className="Login-button" >{email || text ?  "submit": "Loading..."} </button>
        <span>something went wrong</span>
        
    </form> 
    
    <Modal hidden={hide}/>
    </>;
}