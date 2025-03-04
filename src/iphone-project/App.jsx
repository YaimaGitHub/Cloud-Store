"use client";
import React, { useState } from "react";


//import iphone15promax from "../iphone-project/assets/iphone15promax.jpg";
import { Main } from "./Main.jsx";
import { Login } from "./Login.jsx";
import { NavBar } from "./NavBar.jsx";
import { End } from "./End.jsx";

import {ImAlarm, ImNotification} from "react-icons/im";
export default function App()
{
    const [open, setOpen]=useState(false);
    const [email, setEmail]=useState("");
    const [text, setText]=useState("");
    //const [info, setInfo] =useState(false);

    
    const submitForm=(e, Result=f=>f)=>{
        e.preventDefault();
            Result(email, text);
                  
            setEmail("");
            setText("");
        }

    return< div> 
    <div className="app-container" >
       <span  className="anouncement-container" ><ImNotification/>Annoucement: </span>
       <marquee>patronize us and enjoy huge discount on your first buy,when you register !!!,  </marquee>
     </div>
    {
       
          <NavBar open={open}  setOpen={()=>setOpen(open=>!open)}/>
    }

        <div className="app-main-container" >
          {
             open?  <Login submitForm={submitForm} email={email} setEmail={setEmail}  text={text} setText={setText} /> : <Main/>
            }
           
        </div>

       <div>
        {
            End()
        }
        </div>

        </div>
}














