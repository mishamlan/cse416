'use client'

import { useState, createContext } from "react";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export const SelectContext = createContext();

const RootLayout = ({children}) => {

  const [option, setOption] = useState('default');

  return (
    <html className="w-screen h-screen" lang="en">
      <SelectContext.Provider value={{option, setOption}}>
        <body>
          <Nav option={option} setOption={setOption} />
          <main className="content">{children}</main>
        </body>
      </SelectContext.Provider>
    </html>
  )
}

export default RootLayout