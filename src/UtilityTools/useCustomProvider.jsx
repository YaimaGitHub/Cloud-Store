import React, { useState } from "react";
//import the json around here so the context can work on it;
import color from "../color-data.json";
import { createContext } from "react";

//export context around here, and call the createcontext
export const ColorContext=createContext();

export default function useCustomProvider({children})
{
    //context can not mutate any RxValue, t be able to do sortUserPlugins, it requires a stateful hook
    const [value, setColor]=useState(color);

   const OnAdd=(title,color)=>setColor([...value,{id:v4(),title, color, rate:0}])
   const Remove=(id)=>
        {
            setColor(value.filter(color=>color.id!==id))
        }

    return <ColorContext.Provider value={{value, OnAdd, Remove}}>
        {
            children
        }
    </ColorContext.Provider>
}

