'use client'

import { useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  
  // center of the map
  const center = [-98.403102,39.567843];  // general center
  const nevadaCenter = [-116.911022,38.861699];  // center of Nevada
  const louisianaCenter = [-92.530767,31.029098];  // center of Louisiana
  
  // set position bound
  const bound = [
    [-146.991116,17.613213],  // southwest
    [-51.454007,54.451247]  // northeast
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
        addMapLayer('nevada', '/geoJSON/nevada-outline.geojson', stateColor);
        addLineLayer('nevada-district', '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson', districtColor);
        addMapLayer('louisiana', '/geoJSON/louisiana.geojson', stateColor);
        addLineLayer('louisiana-congress', '/geoJSON/louisiana-congress.geojson', districtColor);
        addLineLayer('louisiana-precincts', '/geoJSON/louisiana-precinct.geojson', precinctColor);
        hideMapLayer('louisiana-congress-line');
        hideMapLayer('louisiana-precincts-line');
        hideMapLayer('nevada-district-line')
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

  const addLineLayer = (id, path, color) => {
    if(!mapRef.current.getSource(id)) {
      mapRef.current.addSource(id, {
        type: 'geojson',
        data: path,  // path -> public/geoJSON/...
      });

      mapRef.current.addLayer({
        id: id+'-line',
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
    mapRef.current.setLayoutProperty(id, 'visibility', 'none');
  }
  
  const showMapLayer = (id) => {
    mapRef.current.setLayoutProperty(id, 'visibility', 'visible');
  }

  return (
    <div ref={mapContainerRef} className="map-container"></div>
  )
}

export default Map