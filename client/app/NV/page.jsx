
"use client";  
import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';

const NV = () => {
  const stateName = 'nevada';
  const center = [-116.911022,38.861699];
  const bound = [[-122.169058,34.787989],[-111.479360,42.764263]];
  // const nevadaDistricts = '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson';
  const [districtData, setDistrictData] = useState(null);
  const [isClient, setIsClient] = useState(false); 


  useEffect(() => {
    setIsClient(true); 

    const fetchDistrictData = async () => {
      try {
        const response = await fetch('/geojson/2021Congressional_Final_SB1_Amd2.geojson');
          if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDistrictData(data); 
        } else {
          console.error('Failed to fetch the GeoJSON data');
        }
      } catch (error) {
        console.error('Error fetching the GeoJSON data:', error);
      }
    };
    if(districtData==null)
    fetchDistrictData();
  }, []);
  // if (!isClient) return null 

  return (
    <div>
      <StatePage 
        stateName={stateName} 
        center={center}
        bound={bound}
        districtJSON={districtData}
      />
    </div>
  )
}

export default NV