"use client";

import { useState } from "react";
import trees from '../temp/trees'
import attractions from '../temp/attractions'
import Markers from "./Markers";


const points = [ ...attractions];

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapComp = () => {
  const position = { lat: 53.54, lng: 10 };

  return (
    <APIProvider apiKey={'AIzaSyDKi_KEnRUy_O-l9k7A0qiMJAN4FfAv20c'}>
      <div style={{height:"100vh",width:"100%"}}>
      <Map defaultZoom={2} defaultCenter={{ lat: 43.64, lng: -79.41 }} mapId={"9b6753c411e8d3cc"}>
      <Markers points={points} />
      </Map>
      </div>
    </APIProvider>
  );
};

export default MapComp;