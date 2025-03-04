import React from "react";
export function NavBar({open, setOpen=f=>f}) {
    return <header className="navbar-header-container" >
        <h1 className='navbar-heading'  >XMAS STORES</h1>
        <button className="navbar-button" onClick={setOpen}>{open?" Go back":"Contact us"}</button>

     </header>;}

  