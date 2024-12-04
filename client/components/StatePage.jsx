'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Summary from '@/components/Summary';
import ViewElection from './ViewElection';
import Compare from '@/components/Compare';
import { getDistrictPlan,  } from '@/app/api/utils';
import 'mapbox-gl/dist/mapbox-gl.css';

const StatePage = ({stateName, center, bound, districtJSON,
}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();

    const [displayDistricts, setDisplayDistricts] = useState(true);
    const [displayPrecincts, setDispPrecincts] = useState(false);
    const [tab, setTab] = useState('summary');
    const [ensemble, setEnsemble] = useState('smd');
    const [districtPlan, setDistrictPlan] = useState('1');
    const [demographics, setDemographics] = useState({
      white: 20000,
      Asian: 10000,
      Hispanic: 10000,
      Black: 10000,
      Other: 10000,
    });
    
    let hoverPolyongId = null;

    const selectEnsemble = (e) => {
      setEnsemble(e.target.value);
    }

    const selectDistrictPlan = (e) => {
      setDistrictPlan(e.target.value);
    }

    useEffect(() => {
      if (!stateRef.current) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibnozMSIsImEiOiJjbTFlOWI3OXYxajJ3MnZvbmxndXQ2M2Z6In0.56ahjZJxD52t9UyCTlnm4Q';
          stateRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // container ID
            style: 'mapbox://styles/nz31/cm1mpjkcf004101p36vrw409x/draft', // style URL
            center: center, // starting position [lng, lat]
            zoom: 4.5,
            minZoom: 4.5,
            maxBounds: bound,
          });
  
          stateRef.current.on('load', () => {
            addMapLayer(`${stateName}-district`, districtJSON, '#00ff4c', '#96ffb7');

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

      }

      const fetchDistrictPlan = async () => {
        // console.log(stateName)
        // console.log(ensemble)
        // console.log(districtPlan)
        const data = await getDistrictPlan(stateName, ensemble, districtPlan);
        console.log(data);
        setDemographics(data.demographics.totals);
      }

      fetchDistrictPlan();

    },[displayDistricts, displayPrecincts, districtPlan]);

    const addMapLayer = (id, geojson, fillColor, highlightColor) => {
      if(!stateRef.current.getSource(id)) {
        stateRef.current.addSource(id, {
          type: 'geojson',
          data: geojson,
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
            'line-color': 'green',
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
    //   stateRef.current.setLayoutProperty(id, 'visibility', 'none');
    }
    
    const showMapLayer = (id) => {
    //   stateRef.current.setLayoutProperty(id, 'visibility', 'visible');
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
      <div className='state-content'>
        <div className="w-7/12 h-full border-r-2 border-black">
          <div className="w-full h-1/5">
            <h1 className='text-2xl ml-4 pt-8 font-bold'>Settings</h1>
            <div className="flex">
              <div className='w-60 h-20 flex flex-col mx-4 my-8'>
                <span>District Type</span>
                <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectEnsemble}>
                  <option value="SMD">SMD</option>
                  <option value="MMD">MMD</option>
                </select>
              </div>
              <div className='w-60 h-20 flex flex-col mx-4 my-8'>
                <span>District Plan</span>
                <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrictPlan}>
                  <option value="1">Test Plan</option>
                  <option value="2020-enact">2020 Enacted Plan</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="text-lg font-bold text-center text-gray-500 border-b-8 border-gray-200">
              <ul className="flex flex-wrap -mb-2 pl-2">
                <li className="me-8">
                  <button className={tab == 'summary' ? 'tab-selected' : 'tab'} value={'summary'} onClick={(e) => setTab(e.target.value)}>District Plan Summary</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'view-election' ? 'tab-selected' : 'tab'} value={'view-election'} onClick={(e) => setTab(e.target.value)}>View Election(s)</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'compare' ? 'tab-selected' : 'tab'} value={'compare'} onClick={(e) => setTab(e.target.value)}>Compare</button>
                </li>
              </ul>
            </div>
            <Summary tab={tab} ensemble={ensemble} districtPlan={districtPlan} demographics={demographics}/>
            <ViewElection tab={tab} districtPlan={districtPlan} />
            <Compare tab={tab} />
          </div>
        </div>
        <div ref={mapContainerRef} className="w-5/12 h-full">
          <div className="flex flex-col w-28 h-28 bg-white absolute bottom-8 left-3 z-10 p-5 shadow-lg border-2 invisible">
            <div className='flex '><div className='w-5 h-1 bg-black'></div> State</div>
            <div className='flex '><div className='w-5 h-1 bg-green-500'></div> District</div>
            <div className='flex '><div className='w-5 h-1 bg-purple-500'></div> Precinct</div>
          </div>
        </div>
      </div>
    )
}

export default StatePage