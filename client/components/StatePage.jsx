'use client'

import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { SelectContext } from '@/app/layout';
import mapboxgl from 'mapbox-gl';
import Dashboard from './Dashboard';
import Plans from '@/components/Plans';
import BoxNWhisker from './BoxNWhisker';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getDistrictPlan } from '@/app/api/utils';

const StatePage = ({state, center, bound, smdPlans, mmdPlans, smdPlanNames, mmdPlanNames,
}) => {
    const mapContainerRef = useRef();
    const stateRef = useRef();
    const router = useRouter();

    const [tab, setTab] = useState('dashboard');
    const [ensemble, setEnsemble] = useState('smd');
    const [districtPlan, setDistrictPlan] = useState(0);
    
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
            addMapLayer(`${ensemble}-${districtPlan}`, smdPlans[districtPlan], '#00ff4c', '#96ffb7');
            clickLayer(ensemble, districtPlan);
          });
          
      } else {
        const changeLayer = (ensemble, districtPlan) => {
          for (const plan in smdPlans) {
            hideMapLayer(`smd-${plan}-fills`);
            hideMapLayer(`smd-${plan}-lines`);
          }
          for (const plan in mmdPlans) {
            hideMapLayer(`mmd-${plan}-fills`);
            hideMapLayer(`mmd-${plan}-lines`);
          }
          if (stateRef.current.getLayer(`${ensemble}-${districtPlan}-fills`)) {
            showMapLayer(`${ensemble}-${districtPlan}-fills`);
            showMapLayer(`${ensemble}-${districtPlan}-lines`);
          }
          else {
            if (ensemble == 'smd') addMapLayer(`${ensemble}-${districtPlan}`, smdPlans[districtPlan], '#00ff4c', '#96ffb7');
            else addMapLayer(`${ensemble}-${districtPlan}`, mmdPlans[districtPlan], '#00ff4c', '#96ffb7');
            clickLayer(ensemble, districtPlan)
          }
        }
        if (tab == 'plans') changeLayer(ensemble, districtPlan);
      }

      // const func = async (ensemble, districtPlan)=>{
      //   const data = await getDistrictPlan(state, ensemble, 0)
      //   console.log(data)
      //   console.log(districtPlan)
      // }
      // func(ensemble, districtPlan);

    },[ensemble, districtPlan]);

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
      if (stateRef.current.getLayer(id)) stateRef.current.setLayoutProperty(id, 'visibility', 'none');
    }
    
    const showMapLayer = (id) => {
      stateRef.current.setLayoutProperty(id, 'visibility', 'visible');
    }

    const clickLayer = (ensemble, districtPlan) => {
      stateRef.current.on('mousemove', `${ensemble}-${districtPlan}-fills`, (e) => {
        stateRef.current.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (hoverPolyongId) {
            stateRef.current.removeFeatureState(
              {source: `${ensemble}-${districtPlan}`, id: hoverPolyongId},
            );
          }

          hoverPolyongId = e.features[0].id;

          stateRef.current.setFeatureState(
            {source: `${ensemble}-${districtPlan}`, id: hoverPolyongId},
            {hover: true}
          );
        }
      });
      
      stateRef.current.on('mouseleave', `${ensemble}-${districtPlan}-fills`, () => {
        if (hoverPolyongId !== null) {
          stateRef.current.setFeatureState(
            {source: `${ensemble}-${districtPlan}`, id: hoverPolyongId},
            {hover: false}
          );
        }
        hoverPolyongId = null;
      });

      stateRef.current.on('click', `${ensemble}-${districtPlan}-fills`, (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<div><span>District Number: ${e.features[0].properties.DISTRICT}</span><br/><span>Is Opportunity District: ${e.features[0].properties.OpportunityDistrict}</span><br/><span>DEM Votes: ${e.features[0].properties.DVOTES.toLocaleString()}</span><br/><span>REP Votes: ${e.features[0].properties.RVOTES.toLocaleString()}</span><br/><span>Minority Population Share: ${e.features[0].properties.MinorityPopulationShare}%</span><br/><span>DEM Candidate: ${e.features[0].properties.DCAND}</span><br/><span>REP Candidate: ${e.features[0].properties.RCAND}</span>`)
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
                  <button className={tab == 'plans' ? 'tab-selected' : 'tab'} value={'plans'} onClick={(e) => setTab(e.target.value)}>Available Plans</button>
                </li>
                <li className="me-8">
                  <button className={tab == 'box&whisker' ? 'tab-selected' : 'tab'} value={'box&whisker'} onClick={(e) => setTab(e.target.value)}>Box & Whisker</button>
                </li>
              </ul>
              <button className='reset mr-2 mt-1' onClick={resetEvent}><img src="reset.svg" alt="reset" /></button>
            </div>
            <Dashboard tab={tab} state={state} />
            <Plans tab={tab} state={state} setEnsemble={setEnsemble} setDistrictPlan={setDistrictPlan} ensemble={ensemble} districtPlan={districtPlan} smdPlans={smdPlans} mmdPlans={mmdPlans} smdPlanNames={smdPlanNames} mmdPlanNames={mmdPlanNames} />
            <BoxNWhisker tab={tab} state={state} />
          </div>
        </div>
        <div ref={mapContainerRef} className="right-panel">
        </div>
      </div>
    )
}

export default StatePage