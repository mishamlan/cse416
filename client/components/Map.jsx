'use client'

import { useRef, useEffect, useContext, useState } from 'react';
import {HeaderContext} from '@/app/layout';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@/styles/Map.css'


const Map = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  
  // center of the map
  let {stateSelect, displayDistricts, displayPrecincts, choropleth} = useContext(HeaderContext);
  const center = [-98.403102,39.567843];  // general center
  const nevadaCenter = [-116.911022,38.861699];  // center of Nevada
  const louisianaCenter = [-92.530767,31.029098];  // center of Louisiana
  
  // set position bound
  const bound = [
    [-146.991116,17.613213],  // southwest
    [-51.454007,54.451247]  // northeast
  ];
  const nevadaBound = [
    [-128.853161,34.112444],
    [-104.968884,43.313750]
  ];
  const louisianaBound = [
    [-92.530767,31.029098],
    [-86.559698,33.527363]
  ];

  const stateColor = 'Black';
  const districtColor = 'Green';
  const precinctColor = 'Purple';
  

  useEffect(() => {
    if (!mapRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoibnozMSIsImEiOiJjbTFlOWI3OXYxajJ3MnZvbmxndXQ2M2Z6In0.56ahjZJxD52t9UyCTlnm4Q';
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, // container ID
        style: 'mapbox://styles/nz31/cm1mpjkcf004101p36vrw409x/draft', // style URL
        center: center, // starting position [lng, lat]
        zoom: 4, // starting zoom
        minZoom: 4,
        maxBounds: bound,
      });
  
      mapRef.current.on('load', () => {
        addMapLayer('nevada', '/geoJSON/nevada-w-countries.geojson', stateColor);
        addMapLayer('louisiana', '/geoJSON/louisiana.geojson', stateColor);
        addMapLayer('louisiana-congress', '/geoJSON/louisiana-congress.geojson', districtColor);
        addMapLayer('louisiana-precincts', '/geoJSON/louisiana-precinct.geojson', precinctColor);
        hideMapLayer('louisiana-congress');
        hideMapLayer('louisiana-precincts');
      });

    } else {
      if (stateSelect == 'N/A') {
        mapRef.current.flyTo({
          center: center,
          zoom: 3.5,
        });
      } else if (stateSelect == 'NV') {
        mapRef.current.flyTo({
          center: nevadaCenter,
          zoom: 5.5,
        });
        
        if(displayDistricts) {
          // showMapLayer('louisiana-congress');
          // hideMapLayer('louisiana');
        } else {
          // hideMapLayer('louisiana-congress');
          // showMapLayer('louisiana');
        }
        
        if(displayPrecincts) {
          // showMapLayer('louisiana-precincts');
        } else {
          // hideMapLayer('louisiana-precincts');
        }
      } else {
        mapRef.current.flyTo({
          center: louisianaCenter,
          zoom: 6.5,
        });
        
        if(displayDistricts) {
          showMapLayer('louisiana-congress');
          hideMapLayer('louisiana');
        } else {
          hideMapLayer('louisiana-congress');
          showMapLayer('louisiana');
        }
        
        if(displayPrecincts) {
          showMapLayer('louisiana-precincts');
        } else {
          hideMapLayer('louisiana-precincts');
        }
      }

    }

    
  }, [mapRef, stateSelect, displayDistricts, displayPrecincts]);

  const addMapLayer = (id, path, color) => {
    if(!mapRef.current.getSource(id)) {
      mapRef.current.addSource(id, {
        type: 'geojson',
        data: path,  // path -> public/geoJSON/...
      });
  
      mapRef.current.addLayer({
        id: id+'fill',
        type: 'fill',
        source: id,
        layout: {},
        paint: {
          'fill-color': color,
          'fill-opacity': 0.4
        }
      });
  
      mapRef.current.addLayer({
        id: id+'line',
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
    mapRef.current.setLayoutProperty(id+'fill', 'visibility', 'none');
    mapRef.current.setLayoutProperty(id+'line', 'visibility', 'none');
    console.log('hide layer')
  }
  
  const showMapLayer = (id) => {
    mapRef.current.setLayoutProperty(id+'fill', 'visibility', 'visible');
    mapRef.current.setLayoutProperty(id+'none', 'visibility', 'visible');
    console.log('add layer')
  }

  return (
    <div ref={mapContainerRef} className="map-container"></div>
  )
}

export default Map