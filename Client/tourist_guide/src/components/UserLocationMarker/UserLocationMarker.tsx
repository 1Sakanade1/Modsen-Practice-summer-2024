"use client";

import React, { useMemo } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import userArrowImage from "../../static/vector.svg";
import krug from "../../static/mikhail_krug.svg";
import "../../style/UserLocationMarkerStyle.css";

const UserLocationMarker: React.FC = () => {
  const state = useSelector((state: RootState) => state.location);

  const userPosition = useMemo(() => {
    if (state && state.userLocation) {
      return state.userLocation;
    }
    return { latitude: 0, longitude: 0, heading: 0 }; // добавить heading
  }, [state?.userLocation]);

  return (
    <AdvancedMarker
      position={{ lat: userPosition.latitude, lng: userPosition.longitude }}
    >
      <div className="marker-container">
        <img src={krug} alt="Круг" />
        <img src={userArrowImage} alt="Стрелка" />
      </div>
    </AdvancedMarker>
  );
};

export default UserLocationMarker;
