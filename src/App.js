import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Route, Switch } from 'react-router-dom';
import Map from './components/Map';
import locationService from './services/locations';
import Navigation from './components/Navigation';
import NewLocationForm from './components/NewLocationForm';
import NearestLocations from './components/NearestLocations';
import Login from './pages/Login';
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState({ lat: 65.012615, lng: 25.471453 });
  const [newLocationCoords, setNewLocationCoords] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [longPress, setLongPress] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  useEffect(() => {
    const handlePermission = async () => {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          setUserLocation({
            lat: +position.coords.latitude,
            lng: +position.coords.longitude,
          });
        });
        setZoom(16);
      }

      if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            lat: +position.coords.latitude,
            lng: +position.coords.longitude,
          });
          setZoom(16);
        });
      }
    };
    handlePermission();
  }, []);

  useEffect(() => {
    const getAllLocations = async () => {
      const response = await locationService.getValidatedLocations();
      const locationsWithDistances = response.map(calculateDistances);
      setLocations(locations.concat(locationsWithDistances).sort((a, b) => a.distance - b.distance ));
    };
    getAllLocations();
  }, [userLocation]);

  const calculateDistances = (location) => {
    let distance = 0;
    const R = 6371;

    const dLat = toRad(userLocation.lat - location.lat);
    const dLon = toRad(userLocation.lng - location.lng);
    const lat1 = toRad(location.lat);
    const lat2 = toRad(userLocation.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = R * c;

    if (distance < 1000) {
      distance = distance * 1000;
    }

    location.distance = distance;

    return location;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  }

  const setNewLocation = (e) => {
    const place = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setLocations(locations.concat(place));
    setNewLocationCoords(place);
    setShowInfoBar(!showInfoBar);
  };

  const toggleInfoBar = () => {
    setShowInfoBar(!showInfoBar);
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  if (loadError) {
    return 'Error';
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Navigation />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" exact>
        <Map
          zoom={zoom}
          selectedLocation={selectedLocation}
          userLocation={userLocation}
          locations={locations}
          selectLocation={selectLocation}
          setNewLocation={setNewLocation}
        />
        {showInfoBar ? (
          <NewLocationForm newLocationCoords={newLocationCoords} toggleInfoBar={toggleInfoBar} />
        ) : (
          <NearestLocations
            selectedLocation={selectedLocation}
            selectLocation={selectLocation}
            locations={locations}
          />
        )}
      </Route>
    </div>
  );
};

export default App;
