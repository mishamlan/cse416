"use client"

import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';
import { getGeoJson } from "../api/utils";

const NV = () => {
  const stateName = 'nv';

  const center = [-116.911022, 38.861699];
  const bound = [[-121.416140,34.034490], [-111.440554,42.851839]];
  
  const [districtData, setDistrictData] = useState(null);
  const districtJSON = "geoJSON/2021Congressional_Final_SB1_Amd2.geojson";
  const [racialData, setRacialData] = useState(null);

  useEffect(() => {
    const fetchGeojson = async () => {
      const data = await getGeoJson(stateName, 'districts');
      setDistrictData(data);
    }

    if (districtData == null) fetchGeojson();

    const fetchRacialData = async () => {
      let data;
      if(data = localStorage.getItem('nv_racial_data')){
        setRacialData(JSON.parse(data));
        console.log('inside if statement')
      }
      try {
        const res = await fetch('http://localhost:8080/demographic/nv/nv_racial_data');
        if (res.ok) {
          const data = await res.json();
          setRacialData(data);
          localStorage.setItem('nv_racial_data', JSON.stringify(data))
        } else {
          console.error('Failed to fetch the racial GeoJSON data');
        }
      } catch (error) {
        console.error('Error fetching the racial GeoJSON data:', error);
      }
    };

    if (racialData === null) fetchRacialData();
  }, [districtData, racialData]);

  return (
    <StatePage 
      state={stateName} 
      center={center}
      bound={bound}
      districtJSON={districtJSON}
      racialJSON={racialData}
    />
  );
}

export default NV;