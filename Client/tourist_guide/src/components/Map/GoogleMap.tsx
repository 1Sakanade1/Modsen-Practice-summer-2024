"use client";

//import { Attraction } from "../temp/attractions";
import attractions from "../../temp/attractions";
import Directions from "../Directions/Directions";
import Markers from "../Markers/Markers";
import UserLocationMarker from "../UserLocationMarker/UserLocationMarker";
import { useState, useMemo } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const points: any[] = attractions.map((attraction) => ({
  // const points: Attraction[] должен быть   но вылазит ошибка когда так делаю
  ...attraction,
  key: attraction.id.toString(),
}));

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GoogleMap: React.FC = () => {
  const [isDirectionVisible, setIsDirectionVisible] = useState(true);

  const state = useSelector((state: RootState) => state.location);

  const userPosition = useMemo(() => {
    if (state && state.userLocation) {
      return state.userLocation;
    }
    return { latitude: 0, longitude: 0, heading: 0 }; // добавить heading
  }, [state?.userLocation]);
  //когда стили переношу в отдельный файл и пытаюсь подключить, то карта ломается
  return (
    <APIProvider apiKey={"AIzaSyDKi_KEnRUy_O-l9k7A0qiMJAN4FfAv20c"}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          defaultZoom={2}
          defaultCenter={{ lat: 43.64, lng: -79.41 }}
          mapId={"9b6753c411e8d3cc"}
        >
          <Markers points={points} />
          <UserLocationMarker />
          {isDirectionVisible && (
            <Directions
              origin={{
                latitude: userPosition.latitude,
                longitude: userPosition.longitude,
              }}
              destination={{ latitude: 55.1837, longitude: 30.2047 }} //55.18377553288022, 30.204706111748948
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;

//не знаю как пофиксить ошибку с points
