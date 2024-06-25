"use client";

import { useState } from "react";

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
      <Map zoom={9} center={position} mapId={"9b6753c411e8d3cc"}></Map>
      </div>
    </APIProvider>
  );
};

export default MapComp;