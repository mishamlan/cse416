"use client";  
import { useEffect, useState } from 'react';
import StatePage from "@/components/StatePage";
import { getGeoJson, getDistrictPlan } from '@/app/api/utils';

const LA = () => {
  const stateName = 'la';
  const center = [-92.530767,31.029098];
  const bound = [[-95.869350,28.233563],[-88.359821,33.563892]];
  const louisianaDistricts = '/geoJSON/louisiana-congress.geojson';

  const SMDEnsemble = {
    smd1: '/geoJSON/louisiana-congress.geojson',
  };

  const [districtData, setDistrictData] = useState(null);


  useEffect(() => {
    // const fetchDistrictData = async () => {
    //   try {
    //     const response = await fetch('/geojson/louisiana-congress.geojson');
    //             if (response.ok) {
    //       const data = await response.json();
    //       console.log(data)
    //       setDistrictData(data); // Set the fetched data to state
    //     } else {
    //       console.error('Failed to fetch the GeoJSON data');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching the GeoJSON data:', error);
    //   }
    // };
    // if(districtData==null)
    // fetchDistrictData();

    // const res = getGeoJson('la', 'louisiana-congress.geojson');
    // setDistrictData(res);

    // console.log(districtData)
  }, []);

  return (
    <StatePage 
        stateName={stateName} 
        center={center}
        bound={bound}
        districtJSON={louisianaDistricts}
    />
  )
}

export default LA