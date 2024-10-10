import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'louisiana';
  const center = [-92.530767,31.029098];
  const bound = [[-95.869350,28.233563],[-88.359821,33.563892]];
  const louisianaDistricts = '/geoJSON/louisiana-congress.geojson';

  return (
    <div>
      <StatePage 
        stateName={stateName} 
        center={center}
        bound={bound}
        districtJSON={louisianaDistricts}
      />
    </div>
  )
}

export default LA