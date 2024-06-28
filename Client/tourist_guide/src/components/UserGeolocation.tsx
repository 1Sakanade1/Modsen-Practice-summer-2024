import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { RootState } from '../store/store';

type PositionOptionsWithFrequency = Omit<PositionOptions, 'frequency'> & {
  frequency?: number;
};

const UserGeolocation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userLocation = useSelector((state: RootState) => state.userLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch({ type: 'SET_USER_LOCATION', payload: location });
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
          frequency: 5000,
        } as PositionOptionsWithFrequency
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  useEffect(() => {
    if (userLocation) {
      console.log(`User location: ${userLocation.latitude}, ${userLocation.longitude}`);
    }
  }, [userLocation]);

  return null;
};

export default UserGeolocation;