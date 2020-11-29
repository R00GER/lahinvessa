import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Route } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';
import calculateDistances from './helpers/distances';
import Map from './components/Map';
import locationService from './services/locations';
import Navigation from './components/Navigation';
import NewLocationForm from './components/NewLocationForm';
import NearestLocations from './components/NearestLocations';
import SelectedLocation from './components/SelectedLocation';
import Login from './pages/Login';
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 65.012615,
    lng: 25.471453,
  });
  const [newLocationCoords, setNewLocationCoords] = useState({});
  const [locations, setLocations] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState(null);

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
      const locationsWithDistances = response.map((location) =>
        calculateDistances(location, userLocation)
      );
      console.log('locations from useeffect', locationsWithDistances);
      setLocations(
        locations.concat(locationsWithDistances).sort((a, b) => a.distance - b.distance)
      );
    };
    getAllLocations();
  }, [userLocation]);

  const setNewLocation = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setLocations(locations.concat(newLocation));
    setNewLocationCoords(newLocation);
    setShowInfoBar(!showInfoBar);
  };

  const removePlaceholderLocation = (locationToRemove) => {
    setLocations(
      locations.filter(
        (location) => location.lat !== locationToRemove.lat && location.lng !== locationToRemove.lng
      )
    );
  };

  const toggleInfoBar = () => {
    setShowInfoBar(!showInfoBar);
  };

  const selectLocation = (location) => {
    setLocationDetails(location);

    if (location) {
      setCenter({ lat: location.lat, lng: location.lng });
    }
  };

  const rate = (ratedLocation) => {
    setLocations(
      locations.map((location) => (location.id === ratedLocation.id ? ratedLocation : location))
    );
  };

  return (
    <div className="app">
      <Navigation />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" exact>
        <Map
          loadError={loadError}
          isLoaded={isLoaded}
          zoom={zoom}
          userLocation={userLocation}
          locations={locations}
          selectLocation={selectLocation}
          setNewLocation={setNewLocation}
          center={center}
        />
        {showInfoBar ? (
          <NewLocationForm
            buttonLabelAdd="Lisää vessa"
            buttonLabelCancel="Peruuta"
            newLocationCoords={newLocationCoords}
            toggleInfoBar={toggleInfoBar}
            removePlaceholderLocation={removePlaceholderLocation}
          />
        ) : (
          <NearestLocations
            locationDetails={locationDetails}
            selectLocation={selectLocation}
            locations={locations}
            toggleInfoBar={toggleInfoBar}
          />
        )}
        {locationDetails && (
          <SelectedLocation
            locationDetails={locationDetails}
            selectLocation={selectLocation}
            rate={rate}
          />
        )}
      </Route>
    </div>
  );
};

export default App;
