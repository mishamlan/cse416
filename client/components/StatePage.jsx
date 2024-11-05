'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Menu from "@/components/Menu";
import Summary from '@/components/Summary';
import Compare from '@/components/Compare';
import 'mapbox-gl/dist/mapbox-gl.css';

<<<<<<< HEAD
const StatePage = ({stateName, center, bound, districtJSON, stateJSON,
  dummy_districts,racialIdentities,dummy_populationData,NV_traces,NV_demographic_layout
}) => {
  // console.log(districtJSON)
    const mapContainerRef = useRef();
    const stateRef = useRef();

    const [displayDistricts, setDisplayDistricts] = useState(true);
    const [displayPrecincts, setDispPrecincts] = useState(false);
    const [displayLayer, setDisplayLayer] = useState('district');
    const [visualization, setVisualization] = useState('none');
    const [districtPlan, setDistrictPlan] = useState('current');
    const [tab, setTab] = useState('summary');
    
    let hoverPolyongId = null;
=======
const StatePage = ({stateName, center, bound, districtJSON, racialJSON}) => {

    const mapContainerRef = useRef();
    const stateRef = useRef();
    const [displayDistricts, setDisplayDistricts] = useState(true);
    const [displayPrecincts, setDispPrecincts] = useState(false);
    const [visualization, setVisualization] = useState(null);
    const [districtPlan, setDistrictPlan] = useState('current-plan');
  
    const districtPopulations = {};

    // Iterate over the districtData array to populate the districtPopulations object
    racialJSON.forEach(district => {
      const districtName = district.district;
      districtPopulations[districtName] = [
        district.white.population,
        district.black.population,
        district.asian.population,
        district.hispanic.population,
        district.some_other_race_alone.population,
      ];
    });
    
    const districts = Object.keys(districtPopulations);
    const racialIdentities = ['White', 'Black', 'Asian', 'Hispanic', 'Other'];
    
    const NV_traces = racialIdentities.map((identity, index) => {
      return {
        x: districts,
        y: districts.map(district => districtPopulations[district][index]),
        type: 'bar',
        name: identity,
      };
    });
  console.log(NV_traces)
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
>>>>>>> refs/remotes/origin/main

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
<<<<<<< HEAD
            addMapLayer(`${stateName}-district`, DATA_USED, '#00ff4c', '#96ffb7');
            addLineLayer(`${stateName}-outline`, stateJSON, '#000000');
=======
              addMapLayer(`${stateName}-district`, districtJSON, '#00ff4c', '#96ffb7');
>>>>>>> refs/remotes/origin/main

            highlightLayer(stateName, 'district');
          });
          
      } else {
          if(displayDistricts) {
            showMapLayer(`${stateName}-district-lines`);
            showMapLayer(`${stateName}-district-fills`);
          } else {
            hideMapLayer(`${stateName}-district-lines`);
            hideMapLayer(`${stateName}-district-fills`);
          }
  
          if(displayPrecincts) {
            // showMapLayer(`${stateName}-precincts`);
          } else {
            // hideMapLayer(`${stateName}-precincts`);
          }
  
          switch (visualization) {
              case 'election-results':
                hideMapLayer(`${stateName}-district-white`);
                break;
              case 'white-population':
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
              case 'black-population':
                // hideMapLayer('nevada-district-white');
                break;
              case 'hispanic-population':
                // hideMapLayer('nevada-district-white');
                break;
              case 'asian-population':
                // hideMapLayer('nevada-district-white');
                break;
              case 'other-population':
                // hideMapLayer('nevada-district-white');
                break;
              default:
                console.log('no visualization')
                hideMapLayer('nevada-district-white');
          }
      }
    },[displayDistricts, displayPrecincts, visualization]);

    const addMapLayer = (id, path, fillColor, highlightColor) => {
      if(!stateRef.current.getSource(id)) {
        stateRef.current.addSource(id, {
          type: 'geojson',
          data: path,  // path -> public/geoJSON/...
          generateId: true,
        });
    
        stateRef.current.addLayer({
          id: id+'-fills',
          type: 'fill',
          source: id,
          layout: {},
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              highlightColor,
              fillColor
            ],
            'fill-opacity': 1
          }
        });
    
        stateRef.current.addLayer({
          id: id+'-lines',
          type: 'line',
          source: id,
          layout: {},
          paint: {
            'line-color': 'White',
            'line-width': 2
          }
        });
      }
    }

    const addLineLayer = (id, path, color) => {
      if(!stateRef.current.getSource(id)) {
        stateRef.current.addSource(id, {
          type: 'geojson',
          data: path,  // path -> public/geoJSON/...
        });
  
        stateRef.current.addLayer({
          id: id+'-lines',
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

    const highlightLayer = (stateName, boundary) => {
      stateRef.current.on('mousemove', `${stateName}-${boundary}-fills`, (e) => {
        stateRef.current.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (hoverPolyongId) {
            stateRef.current.removeFeatureState(
              {source: `${stateName}-${boundary}`, id: hoverPolyongId},
            );
          }

          hoverPolyongId = e.features[0].id;

          stateRef.current.setFeatureState(
            {source: `${stateName}-${boundary}`, id: hoverPolyongId},
            {hover: true}
          );
        }
      });
      
      stateRef.current.on('mouseleave', `${stateName}-${boundary}-fills`, () => {
        if (hoverPolyongId !== null) {
          stateRef.current.setFeatureState(
            {source: `${stateName}-${boundary}`, id: hoverPolyongId},
            {hover: false}
          );
        }
        hoverPolyongId = null;
      });
    }
  
    return (
      <div className='content'>
        <Menu setDisplayLayer={setDisplayLayer}
          displayDistricts={displayDistricts} 
          setDisplayDistricts={setDisplayDistricts} 
          displayPrecincts={displayPrecincts} 
          setDisplayPrecincts={setDispPrecincts}
          setVisualization={setVisualization}
          setDistrictPlan={setDistrictPlan}
          visualization={visualization}
          districtPlan={districtPlan}
        />
        <div ref={mapContainerRef} className="state-container">
          <div className="legend-container">
            <div className="legend line-legend" style={{'display': visualization == 'none' ? 'flex' : 'none'}}>
              <div><div id="black-line"></div> State</div>
              <div><div id="green-line"></div> District</div>
              <div><div id="purple-line"></div> Precinct</div>
            </div>
            <div className="legend election-legend" style={{'display': visualization == "election-results" ? 'flex' : 'none'}}>
              election legend
            </div>
            <div className="legend demo-legend" style={{'display': visualization.includes('population') ? 'flex' : 'none'}}>
              <div>
                <div style={{'backgroundColor':"#fff7e5", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#ffe4c9", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#fcd0a1", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#fcae6b", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#fe8d3b", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#f16913", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
                <div style={{'backgroundColor':"#d84801", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
              </div>
              <div>
                <div style={{'padding':"6px 0px"}}></div>
                <div style={{'padding':"6px 0px"}}>1000</div>
                <div style={{'padding':"6px 0px"}}>2000</div>
                <div style={{'padding':"6px 0px"}}>5000</div>
                <div style={{'padding':"6px 0px"}}>10000</div>
                <div style={{'padding':"6px 0px"}}>20000</div>
                <div style={{'padding':"6px 0px"}}>50000</div>
              </div>
            </div>
          </div>
        </div>
        <div className='data-sect'>
          <div className="tabs">
            <div className="tab" style={{'backgroundColor': tab == 'summary' ? 'white': '#a0a0a0'}} onClick={() => setTab('summary')}>Summary</div>
            <div className="tab" style={{'backgroundColor': tab == 'compare' ? 'white': '#a0a0a0'}} onClick={() => setTab('compare')}>Compare</div>
          </div>
          <div className="main-data">
            <Summary tab={tab} data={NV_traces} layout={NV_demographic_layout}/>
            <Compare tab={tab} />
          </div>
        </div>
      </div>
    )
}

export default StatePage