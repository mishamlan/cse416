"use client";  
import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';

const LA = () => {
  const stateName = 'louisiana';
  const center = [-92.530767,31.029098];
  const bound = [[-95.869350,28.233563],[-88.359821,33.563892]];
  const louisianaDistricts = '/geoJSON/louisiana-congress.geojson';

  const [districtData, setDistrictData] = useState(null);


  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await fetch('/geojson/louisiana-congress.geojson');
                if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDistrictData(data); // Set the fetched data to state
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

export default LA