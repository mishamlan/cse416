'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Menu from "@/components/Menu";
import Summary from '@/components/Summary';
import Compare from '@/components/Compare';
import 'mapbox-gl/dist/mapbox-gl.css';

const StatePage = ({stateName, center, bound, districtJSON}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();
  
    const [displayDistricts, setDisplayDistricts] = useState(true);
    const [displayPrecincts, setDispPrecincts] = useState(false);
    const [visualization, setVisualization] = useState(null);
    const [districtPlan, setDistrictPlan] = useState('current-plan');
  
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
      if (!stateRef.current) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibnozMSIsImEiOiJjbTFlOWI3OXYxajJ3MnZvbmxndXQ2M2Z6In0.56ahjZJxD52t9UyCTlnm4Q';
          stateRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // container ID
            style: 'mapbox://styles/nz31/cm1mpjkcf004101p36vrw409x/draft', // style URL
            center: center, // starting position [lng, lat]
            zoom: 5.5,
            minZoom: 5.5,
            maxBounds: bound,
          });
  
          stateRef.current.on('load', () => {
              addLineLayer(`${stateName}-district`, districtJSON, 'Green');
          });
  
      } else {
          if(displayDistricts) {
            showMapLayer(`${stateName}-district-line`);
          } else {
            hideMapLayer(`${stateName}-district-line`);
          }
  
          if(displayPrecincts) {
            // showMapLayer('louisiana-precincts');
          } else {
            // hideMapLayer('louisiana-precincts');
          }
  
          switch (visualization) {
              case 'election-results':
                hideMapLayer(`${stateName}-district-white`);
                break;
              case 'white':
                if (!stateRef.current.getLayer(`${stateName}-district-white`)){
                  console.log('create layer white')
                  stateRef.current.addLayer({
                    id: `${stateName}-district-white`,
                    type: 'fill',
                    source: 'nevada-district',
                    layout: {},
                    paint: {
                      'fill-color': [
                        'step',
                        ['get', 'Area_Sq_Mi'],
                        "#fff7e5",1000,"#ffe4c9", 2000, "#fcd0a1", 5000, "#fcae6b", 10000,"#fe8d3b", 20000, "#f16913", 50000, "#d84801"
                      ],
                      'fill-opacity': 1
                    }
                  });
                } else {
                  showMapLayer(`${stateName}-district-white`);
                }
                break;
              case 'black':
                // hideMapLayer('nevada-district-white');
                break;
              case 'hispanic':
                // hideMapLayer('nevada-district-white');
                break;
              case 'asian':
                // hideMapLayer('nevada-district-white');
                break;
              case 'other':
                // hideMapLayer('nevada-district-white');
                break;
              default:
                console.log('no visualization')
                hideMapLayer('nevada-district-white');
            }
      }
    },[displayDistricts, displayPrecincts, visualization]);
  
    const addLineLayer = (id, path, color) => {
      if(!stateRef.current.getSource(id)) {
        stateRef.current.addSource(id, {
          type: 'geojson',
          data: path,  // path -> public/geoJSON/...
        });
  
        stateRef.current.addLayer({
          id: id+'-line',
          type: 'line',
          source: id,
          layout: {},
          paint: {
            'line-color': color,
            'line-width': 3
          }
        });
      }
    }
  
    const hideMapLayer = (id) => {
      stateRef.current.setLayoutProperty(id, 'visibility', 'none');
    }
    
    const showMapLayer = (id) => {
      stateRef.current.setLayoutProperty(id, 'visibility', 'visible');
    }
  
    return (
      <div className='content'>
        <Menu displayDistricts={displayDistricts} 
          setDisplayDistricts={setDisplayDistricts} 
          displayPrecincts={displayPrecincts} 
          setDisplayPrecincts={setDispPrecincts}
          setVisualization={setVisualization}
          setDistrictPlan={setDistrictPlan}
          visualization={visualization}
        />
        <div ref={mapContainerRef} className="state-container"></div>
        <div className='data-sect'>
          <Summary data={NV_traces} layout={NV_demographic_layout}/>
          <Compare />
        </div>
      </div>
    )
}

export default StatePage