import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Marker } from "@googlemaps/markerclusterer";
import { Button, Modal } from 'antd';
import Nature from '../static/nature.png';

type Props = {
  points: { key: string; lat: number; lng: number; title: string; description: string }[];
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

  const handleMarkerClick = useCallback((key) => {
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
          <Button type="primary" shape="circle" icon={<img src={Nature} style={{ width: '1.5rem', height: '1.5rem' }} />} />
        </AdvancedMarker>
      ))}
      <Modal
        title={activePoint?.title ?? ''}
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