"use client"

import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';

const NV = () => {
  const stateName = 'nv';

  const center = [-116.911022, 38.861699];
  const bound = [[-121.416140,34.034490], [-111.440554,42.851839]];
  
//   const [districtData, setDistrictData] = useState(null);
  const districtData = "geoJSON/2021Congressional_Final_SB1_Amd2.geojson";
  const [racialData, setRacialData] = useState(null);

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await fetch('http://localhost:8080/geojson/nv/districts');
        if (response.ok) {
          const data = await response.json();
          console.log("backend data: \n", data);
          setDistrictData(data);
        } else {
          console.error('Failed to fetch the district GeoJSON data');
        }
      } catch (error) {
        console.error('Error fetching the district GeoJSON data:', error);
      }
    };

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
          console.log(data);
          setRacialData(data);
          localStorage.setItem('nv_racial_data', JSON.stringify(data))
        } else {
          console.error('Failed to fetch the racial GeoJSON data');
        }
      } catch (error) {
        console.error('Error fetching the racial GeoJSON data:', error);
      }
    };

    if (districtData === null) fetchDistrictData();
    if (racialData === null) fetchRacialData();
  }, [districtData, racialData]);

  if (!districtData || !racialData) return <div>Loading...</div>;

  return (
    <StatePage 
      stateName={stateName} 
      center={center}
      bound={bound}
      districtJSON={districtData}
      racialJSON={racialData}
    />
  );
}

export default NV;