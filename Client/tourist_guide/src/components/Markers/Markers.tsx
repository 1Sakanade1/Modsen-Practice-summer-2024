import { useState, useEffect, useRef, useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Marker } from "@googlemaps/markerclusterer";
import { Button, Modal } from "antd";
import { Props } from "./MarkersProps";
import * as images from "../../static/imageImport";
import { MarkersMap } from "./MarkersTypes";

const iconMap: { [key: string]: string } = {
  nature: images.Nature,
  culture: images.Culture,
  adult: images.Adult,
  amusement: images.Amusement,
  architecture: images.Architecture,
  auto: images.Auto,
  bank: images.Bank,
  bicycle: images.Bicycle,
  coffee: images.Coffee,
  food: images.Food,
  gas_station: images.GasStation,
  history: images.History,
  industrial: images.Industrial,
  other: images.Other,
  religion: images.Religion,
  sleep: images.Sleep,
  sport: images.Sport,
  store: images.Store,
  user: images.Vector,
};

const Markers = ({ points }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<MarkersMap>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const activePoint = useMemo(() => {
    return points.find((p) => p.key === activeMarker);
  }, [points, activeMarker]);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  useEffect(() => {
    setActiveMarker(activeMarker || null);
  }, [activeMarker]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleMarkerClick = (key: string) => {
    setActiveMarker(key);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setActiveMarker(null);
    setIsModalVisible(false);
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
          onClick={handleMarkerClick.bind(null, point.key)}
        >
          <Button
            shape="circle"
            icon={
              <img
                src={iconMap[point.category]}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
            }
          />
        </AdvancedMarker>
      ))}
      <Modal
        title={activePoint?.name ?? ""}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {activePoint?.description}
      </Modal>
    </>
  );
};

export default Markers;
