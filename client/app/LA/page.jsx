"use client";  
import { useEffect, useState } from 'react';
import StatePage from "@/components/StatePage";
import { getGeoJson } from '@/app/api/utils';

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const louisianaDistricts = '/geoJSON/louisiana-congress.geojson';

  const SMDEnsemble = {
    smd1: '/geoJSON/louisiana-congress.geojson',
  };

  const [districtData, setDistrictData] = useState(null);


  useEffect(() => {
    const fetchGeojson = async () => {
      const data = await getGeoJson(stateName, 'louisiana-congress');
      console.log(data);;
      setDistrictData(data);
    }

    if (districtData == null) fetchGeojson();

  }, []);

  return (
    <StatePage 
        state={stateName} 
        center={center}
        bound={bound}
        districtJSON={louisianaDistricts}
    />
  )
}

export default LA