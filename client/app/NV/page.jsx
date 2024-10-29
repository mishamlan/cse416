"use client";
import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';

const NV = () => {
  const stateName = 'nevada';
  const center = [-116.911022, 38.861699];
  const bound = [[-122.169058, 34.787989], [-111.479360, 42.764263]];
  
  const [districtData, setDistrictData] = useState(null);
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
      try {
        const res = await fetch('http://localhost:8080/demographic/nv/nv_racial_data');
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setRacialData(data);
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
    <div>
      <StatePage 
        stateName={stateName} 
        center={center}
        bound={bound}
        districtJSON={districtData}
        racialJSON={racialData}
      />
    </div>
  );
}

export default NV;
