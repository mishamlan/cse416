'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Summary from '@/components/Summary';
import ViewElection from './ViewElection';
import Compare from '@/components/Compare';
import 'mapbox-gl/dist/mapbox-gl.css';

const StatePage = ({state, center, bound, districtJSON,
}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();

    const [displayDistricts, setDisplayDistricts] = useState(true);
    const [displayPrecincts, setDispPrecincts] = useState(false);
    const [tab, setTab] = useState('summary');
    const [ensemble, setEnsemble] = useState('smd');
    const [districtPlan, setDistrictPlan] = useState('1');
    
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
            addMapLayer(`${state}-district`, districtJSON, '#00ff4c', '#96ffb7');

            highlightLayer(state, 'district');
          });
          
      } else {
          if(displayDistricts) {
            showMapLayer(`${state}-district-lines`);
            showMapLayer(`${state}-district-fills`);
          } else {
            hideMapLayer(`${state}-district-lines`);
            hideMapLayer(`${state}-district-fills`);
          }
  
          if(displayPrecincts) {
            // showMapLayer(`${state}-precincts`);
          } else {
            // hideMapLayer(`${state}-precincts`);
          }

      }

    },[displayDistricts, displayPrecincts]);

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

    const highlightLayer = (state, boundary) => {
      stateRef.current.on('mousemove', `${state}-${boundary}-fills`, (e) => {
        stateRef.current.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (hoverPolyongId) {
            stateRef.current.removeFeatureState(
              {source: `${state}-${boundary}`, id: hoverPolyongId},
            );
          }

          hoverPolyongId = e.features[0].id;

          stateRef.current.setFeatureState(
            {source: `${state}-${boundary}`, id: hoverPolyongId},
            {hover: true}
          );
        }
      });
      
      stateRef.current.on('mouseleave', `${state}-${boundary}-fills`, () => {
        if (hoverPolyongId !== null) {
          stateRef.current.setFeatureState(
            {source: `${state}-${boundary}`, id: hoverPolyongId},
            {hover: false}
          );
        }
        hoverPolyongId = null;
      });
    }
  
    return (
      <div className='state-content'>
        <div className="left-panel">
          <div className="w-full h-1/5">
            <h1 className='text-2xl ml-4 pt-8 font-bold'>Settings</h1>
            <div className="flex">
              <div className='setting-dropdown mx-4 my-8'>
                <span>District Type</span>
                <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectEnsemble}>
                  <option value="SMD">SMD</option>
                  <option value="MMD">MMD</option>
                </select>
              </div>
              <div className='setting-dropdown mx-4 my-8'>
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
            <div className="tabs">
              <ul className="flex flex-wrap -mb-2 pl-2">
                <li className="me-8">
                  <button className={tab == 'summary' ? 'tab-selected' : 'tab'} value={'summary'} onClick={(e) => setTab(e.target.value)}>Summary</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'view-election' ? 'tab-selected' : 'tab'} value={'view-election'} onClick={(e) => setTab(e.target.value)}>View Election(s)</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'compare' ? 'tab-selected' : 'tab'} value={'compare'} onClick={(e) => setTab(e.target.value)}>Compare</button>
                </li>
              </ul>
            </div>
            <Summary tab={tab} state={state} ensemble={ensemble} districtPlan={districtPlan} />
            <ViewElection tab={tab} state={state} ensemble={ensemble} districtPlan={districtPlan} />
            <Compare tab={tab} state={state} ensemble={ensemble} />
          </div>
        </div>
        <div ref={mapContainerRef} className="right-panel">
        </div>
      </div>
    )
}

export default StatePage