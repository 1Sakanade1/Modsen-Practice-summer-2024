import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Marker } from "@googlemaps/markerclusterer";
import { Button, Modal } from 'antd';

import * as images from '../static/imageImport';



type Attraction = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  photos: string[] | null;
  key: string;
};

type Props = {
  points: Attraction[];
};

const iconMap: { [key: string]: string} = {
  "nature": images.Nature,
  "culture": images.Culture,
  "adult": images.Adult,
  "amusement": images.Amusement,
  "architecture": images.Architecture,
  "auto": images.Auto,
  "bank": images.Bank,
  "bicycle": images.Bicycle,
  "coffee": images.Coffee,
  "food": images.Food,
  "gas_station": images.GasStation,
  "history": images.History,
  "industrial": images.Industrial,
  "other": images.Other,
  "religion": images.Religion,
  "sleep": images.Sleep,
  "sport": images.Sport,
  "store": images.Store,
};

const Markers = ({ points }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    if (activeMarker) {
      setActiveMarker(activeMarker);
    } else {
      setActiveMarker(null);
    }
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

  const handleMarkerClick = useCallback((key: string) => {
    setActiveMarker(key);
    setModalVisible(true);
  }, []);

  const handleModalCancel = () => {
    setActiveMarker(null);
    setModalVisible(false);
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
          onClick={() => handleMarkerClick(point.key)}
        >
          <Button  shape="circle" icon={<img src={iconMap[point.category]} style={{ width: '1.5rem', height: '1.5rem' }} />} />
        </AdvancedMarker>
      ))}
      <Modal
        title={activePoint?.name ?? ''}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {activePoint?.description}
      </Modal>
    </>
  );
};

export default Markers;