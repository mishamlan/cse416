'use client'

import { useState, createContext } from "react";

import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Menu from "@/components/Menu";

export const HeaderContext = createContext();

const RootLayout = ({children}) => {
  // not display menu when first load
  const [menu, setMenu] = useState(false);
  const [stateSelect, setStateSelect] = useState('N/A');
  const [displayDistricts, setDisplayDistricts] = useState(false);
  const [displayPrecincts, setDisplayPrecincts] = useState(false);
  const [visualization, setVisualization] = useState(null);
  const [districtPlan, setDistrictPlan] = useState('current-plan');

  return (
    <html>
      <HeaderContext.Provider value={{stateSelect, displayDistricts, displayPrecincts, visualization, districtPlan}}>
        <body>
          <Nav setMenu={setMenu} setStateSelect={setStateSelect} />
          <Menu isMenu={menu} stateSelect={stateSelect} setDisplayDistricts={setDisplayDistricts} setDisplayPrecincts={setDisplayPrecincts} displayDistricts={displayDistricts} displayPrecincts={displayPrecincts} setVisualization={setVisualization} setDistrictPlan={setDistrictPlan}/>
          <main>{children}</main>
        </body>
      </HeaderContext.Provider>
    </html>
  )
}

export default RootLayout