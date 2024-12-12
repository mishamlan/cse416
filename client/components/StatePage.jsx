'use client'

import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { SelectContext } from '@/app/layout';
import mapboxgl from 'mapbox-gl';
import Summary from '@/components/Summary';
import ViewElection from './ViewElection';
import Compare from '@/components/Compare';
import BoxNWhisker from './BoxNWhisker';
import 'mapbox-gl/dist/mapbox-gl.css';

const StatePage = ({state, center, bound, precinctData, districtJSON, smdEnsemble, mmdEnsemble
}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();
    const router = useRouter();

    const [viewPrecincts, setViewPrecincts] = useState(false);
    const [tab, setTab] = useState('summary');
    const [hideSetting, setHideSetting] = useState(false);
    const [ensemble, setEnsemble] = useState('smd');
    const [districtPlan, setDistrictPlan] = useState('1');
    const [numDistricts, setNumDistricts] = useState(0);
    
    let {setOption} = useContext(SelectContext);
    let hoverPolyongId = null;

    const resetEvent = (e) => {
      setOption('default');
      router.push('/');
    }

    const selectEnsemble = (e) => {
      setEnsemble(e.target.value);
    }

    const selectDistrictPlan = (e) => {
      setDistrictPlan(e.target.value);
    }

    const displaySetting = () => {
      setHideSetting(prev => {return !prev;});
    }

    const displayPrecincts = () => {
      setViewPrecincts(prev => {return !prev;});
    }

    const displayDistrictPlan = (ensemble) => {
      let list = [];
      Object.keys(ensemble).forEach(plan => {
        list.push(<option key={ensemble+plan} value={plan}>{plan} Plan</option>);
      })
      return list;
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
            clickLayer(state, 'district');
          });
          
      } else {
          if(viewPrecincts) {
            if (stateRef.current.getLayer(`${state}-precinct`)) showMapLayer(`${state}-precinct`);
            else addLineLayer(`${state}-precinct`, precinctData, 'purple');
          } else {
            if (stateRef.current.getLayer(`${state}-precinct`)) hideMapLayer(`${state}-precinct`);
          }

      }

    },[viewPrecincts, ensemble, state]);

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

    const addLineLayer = (id, geojson, color) => {
      if(!stateRef.current.getSource(id)) {
        stateRef.current.addSource(id, {
          type: 'geojson',
          data: geojson,  // geojson -> public/geoJSON/...
        });
  
        stateRef.current.addLayer({
          id: id,
          type: 'line',
          source: id,
          layout: {},
          paint: {
            'line-color': color,
            'line-width': 1
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
        <div className="left-panel">
          <div className="w-full">
            <button className="setting" onClick={displaySetting}>
              <h1 className='text-xl pl-4 font-bold'>Settings</h1>
              <div className='pr-4 pt-1'><img src="down-arrow.svg" alt="&#8595" className={hideSetting ? 'rotate-180' : ''} /></div>
            </button>
            <div className={hideSetting ? 'hidden' : "flex justify-between"}>
              <div className='flex'>
                <div className='setting-dropdown m-4'>
                  <span>District Type</span>
                  <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectEnsemble}>
                    <option value="SMD">SMD</option>
                    <option value="MMD">MMD</option>
                  </select>
                </div>
                <div className='setting-dropdown m-4'>
                  <span>District Plan</span>
                  <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrictPlan}>
                    {ensemble == 'smd'? displayDistrictPlan(smdEnsemble) : displayDistrictPlan(mmdEnsemble)}
                  </select>
                </div>
                <div className="precinct-checkbox">
                  <input type="checkbox" id='view-prec' className='hover:cursor-pointer h-5' onClick={displayPrecincts} />
                  <label htmlFor="view-prec" className='text-sm hover:cursor-pointer' >Display Precincts</label>
                </div>
              </div>
              <button className='reset' onClick={resetEvent}>Reset</button>
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
                <li className="me-8">
                  <button className={tab == 'box&whisker' ? 'tab-selected' : 'tab'} value={'box&whisker'} onClick={(e) => setTab(e.target.value)}>Box & Whisker</button>
                </li>
              </ul>
            </div>
            <Summary tab={tab} state={state} ensemble={ensemble} districtPlan={districtPlan} setNumDistricts={setNumDistricts} />
            <ViewElection tab={tab} state={state} ensemble={ensemble} districtPlan={districtPlan} numDistricts={numDistricts} />
            <Compare tab={tab} state={state} ensemble={ensemble} />
            <BoxNWhisker tab={tab} state={state} ensemble={ensemble} />
          </div>
        </div>
        <div ref={mapContainerRef} className="right-panel">
        </div>
      </div>
    )
}

export default StatePage