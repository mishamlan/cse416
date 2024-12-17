'use client'

import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { SelectContext } from '@/app/layout';
import mapboxgl from 'mapbox-gl';
import Dashboard from './Dashboard';
import Plans from '@/components/Plans';
import BoxNWhisker from './BoxNWhisker';
import 'mapbox-gl/dist/mapbox-gl.css';

const StatePage = ({state, center, bound, districtJSON, smdEnsemble, mmdEnsemble
}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();
    const router = useRouter();

    const [tab, setTab] = useState('dashboard');
    
    let {setOption} = useContext(SelectContext);
    let hoverPolyongId = null;

    const resetEvent = (e) => {
      setOption('default');
      router.push('/');
    }

    useEffect(() => {
      if (!stateRef.current) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibnozMSIsImEiOiJjbTFlOWI3OXYxajJ3MnZvbmxndXQ2M2Z6In0.56ahjZJxD52t9UyCTlnm4Q';
          stateRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // container ID
            style: 'mapbox://styles/nz31/cm4rc98xq00c501qt7iaj0yr2', // style URL
            center: center, // starting position [lng, lat]
            zoom: 4.5,
            minZoom: 4.5,
            maxBounds: bound,
          });
  
          stateRef.current.on('load', () => {
            addMapLayer(`${state}-district`, districtJSON, '#00ff4c', '#96ffb7');
            clickLayer(state, 'district');
          });
          
      } else {
          // if(viewPrecincts) {
          //   if (stateRef.current.getLayer(`${state}-precinct`)) showMapLayer(`${state}-precinct`);
          //   else addLineLayer(`${state}-precinct`, precinctData, 'purple');
          // } else {
          //   if (stateRef.current.getLayer(`${state}-precinct`)) hideMapLayer(`${state}-precinct`);
          // }

      }

    },[]);

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
            'fill-opacity': 0.1
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
  
    const hideMapLayer = (id) => {
      stateRef.current.setLayoutProperty(id, 'visibility', 'none');
    }
    
    const showMapLayer = (id) => {
      stateRef.current.setLayoutProperty(id, 'visibility', 'visible');
    }

    const clickLayer = (state, boundary) => {
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

      stateRef.current.on('click', `${state}-${boundary}-fills`, (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<div><span>District Number: ${e.features[0].properties.DISTRICT}</span><br/><span>Winner: ${e.features[0].properties.DIST_NAME}</span>`)
          .addTo(stateRef.current);
      });
    }
  
    return (
      <div className='state-content'>
        <div className="left-panel overflow-y-auto">
          <div className="menu">
            <div className="tabs flex justify-between">
              <ul className="flex flex-wrap -mb-2 pl-2">
                <li className="me-8">
                  <button className={tab == 'dashboard' ? 'tab-selected' : 'tab'} value={'dashboard'} onClick={(e) => setTab(e.target.value)}>Dashboard</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'summary' ? 'tab-selected' : 'tab'} value={'summary'} onClick={(e) => setTab(e.target.value)}>Available Plans</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'box&whisker' ? 'tab-selected' : 'tab'} value={'box&whisker'} onClick={(e) => setTab(e.target.value)}>Box & Whisker</button>
                </li>
              </ul>
              <button className='reset mr-2 mt-1' onClick={resetEvent}><img src="reset.svg" alt="reset" /></button>
            </div>
            <Dashboard tab={tab} state={state} />
            <Plans tab={tab} state={state} smdEnsemble={smdEnsemble} mmdEnsemble={mmdEnsemble} />
            <BoxNWhisker tab={tab} state={state} />
          </div>
        </div>
        <div ref={mapContainerRef} className="right-panel">
        </div>
      </div>
    )
}

export default StatePage