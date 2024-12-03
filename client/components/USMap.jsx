'use client'

import { useRef, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "@/styles/globals.css";


const USMap = () => {
  const router = useRouter();

  const mapContainerRef = useRef();
  const mapRef = useRef();
  
  // center of the map
  const center = [-98.403102,39.567843];  // usa center
  
  // set position bound
  const bound = [
    [-146.991116,17.613213],  // southwest
    [-51.454007,54.451247]  // northeast
  ];

  const stateColor = 'Black';

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
        addMapLayer('nevada', '/geoJSON/nevada-outline.geojson', stateColor);
        addMapLayer('louisiana', '/geoJSON/louisiana.geojson', stateColor);
      });

    }

  }, [mapRef]);

  const addMapLayer = (id, path, color) => {
    if(!mapRef.current.getSource(id)) {
      mapRef.current.addSource(id, {
        type: 'geojson',
        data: path,  // path -> public/geoJSON/...
      });
  
      mapRef.current.addLayer({
        id: id+'-fill',
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

      mapRef.current.on('click', `${id}-fill`, (e) => {
        let state = id == 'nevada' ? 'NV' : 'LA';
        router.push(`/${state}`);
      });

      mapRef.current.on('mouseenter', `${id}-fill`, (e) => {
        mapRef.current.getCanvas().style.cursor = 'pointer';
      });
      mapRef.current.on('mouseleave', `${id}-fill`, (e) => {
        mapRef.current.getCanvas().style.cursor = '';
      });
    }
  }

  return (
    <div ref={mapContainerRef} className="w-full h-full absolute"></div>
  )
}

export default USMap