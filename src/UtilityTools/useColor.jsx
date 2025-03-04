import React, { useState } from "react";
import { createContext, useContext } from "react";
import colorsi from "../color-data.json";
import { v4 } from "uuid";

const ColorContexti=createContext();


export default function ColorContextual({children})
{
   //context can not mutate any RxValue, t be able to do sortUserPlugins, it requires a stateful hook
   const [valued, setColor]=useState(colorsi);

   const OnAdd=(title,color)=>setColor(
[
    ...value,
    {
        id:v4(),
        title,
        color,
        rate:0
    }
])
   const Remove=(id)=>
        {
            setColor(value.filter(color=>color.id!==id))
        }

    return <ColorContexti.Provider value={{valued, OnAdd, Remove}}>
        {
            children
        }
    </ColorContexti.Provider>
}

export const useColors=()=>useContext(ColorContexti);