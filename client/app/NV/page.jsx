"use client";
import StatePage from "@/components/StatePage";
import { useEffect, useState } from 'react';

const NV = () => {
  const stateName = 'nevada';
<<<<<<< HEAD
  const center = [-116.911022,38.861699];
  const bound = [[-122.169058,34.787989],[-111.479360,42.764263]];
  const stateJSON = '/geoJSON/nevada-outline.geojson';
  // const nevadaDistricts = '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson';

=======
  const center = [-116.911022, 38.861699];
  const bound = [[-122.169058, 34.787989], [-111.479360, 42.764263]];
  
>>>>>>> refs/remotes/origin/main
  const [districtData, setDistrictData] = useState(null);
  const [racialData, setRacialData] = useState(null);

  const dummy_districts = ['District 1', 'District 2', 'District 3', 'District 4'];
    const racialIdentities = ['White', 'Black', 'Asian', 'Hispanic', 'Other']; // Fixed the naming and ensured 6 identities
    const dummy_populationData = {
      'District 1': [50000, 30000, 15000, 20000, 4000],
      'District 2': [40000, 35000, 20000, 25000, 4000],
      'District 3': [60000, 20000, 10000, 30000, 4000],
      'District 4': [45000, 25000, 15000, 25000, 4000],
    };
  
    const NV_traces = racialIdentities.map((identity, index) => {
      return {
        x: dummy_districts,
        // Corrected line
        y: dummy_districts.map(district => dummy_populationData[district][index]),
        type: 'bar',
        name: identity,
      };
    });
  
    const NV_demographic_layout = {
      title: "Population by Racial Identity across Districts",
      xaxis: {
        title: "Districts",
      },
      yaxis: {
        title: "Population",
      },
      paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the entire chart
      plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the plot area
      height: 400,
      width: 400,
      legend: {
        orientation: "h", // Make legend horizontal
        x: 0.5, // Center the legend horizontally
        y: -0.5, // Position it below the chart
        xanchor: "center", // Align the legend horizontally to the center
        yanchor: "top", // Align the legend vertically to the top of the chart
      },
      barmode: 'stack', // Stacked bars for better visibility
    };


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
<<<<<<< HEAD
        stateJSON={stateJSON}
        dummy_districts={dummy_districts}
        racialIdentities={racialIdentities}
        dummy_populationData={dummy_populationData}
        NV_traces={NV_traces}
        NV_demographic_layout={NV_demographic_layout}
=======
        racialJSON={racialData}
>>>>>>> refs/remotes/origin/main
      />
    </div>
  );
}

export default NV;
