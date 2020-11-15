import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import locationService from './services/locations';

import icon from './assets/icon.png';
import Navigation from './components/Navigation';
import InfoBar from './components/infoBar';
import Login from './pages/Login';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import './App.css';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  // gestureHandling: 'none',
};

const App = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 65.012615, lng: 25.471453 });
  const [zoom, setZoom] = useState(5);
  const [geoLocationGranted, setGeoLocationGranted] = useState(false);
  const [newLocationCoords, setNewLocationCoords] = useState({});
  const [locations, setLocations] = useState([]);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [longPress, setLongPress] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  useEffect(() => {
    const getAllLocations = async () => {
      const response = await locationService.getValidatedLocations();
      setLocations(locations.filter((location) => response.validated));
    };
    getAllLocations();
  }, []);

  useEffect(() => {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     if (position.coords) {
    //       console.log(
    //         `CURRENT: Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`
    //       );
    //     }

    //     // if (position.coords) {
    //     setCurrentLocation({
    //       lat: +position.coords.latitude,
    //       lng: +position.coords.longitude,
    //     });
    //     // }
    //   });
    // } else {
    //   console.log('Not Available');
    // }
    handlePermission();
  }, []);

  function handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
      if (result.state === 'granted') {
        report(result.state);
        // setGeoLocationGranted(true);
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({
            lat: +position.coords.latitude,
            lng: +position.coords.longitude,
          });
        });
        setZoom(16);
        changeCenter();
      } else if (result.state === 'prompt') {
        report(result.state);
        // setGeoLocationGranted(true);
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({
            lat: +position.coords.latitude,
            lng: +position.coords.longitude,
          });
          setZoom(16);
        });
      } else if (result.state === 'denied') {
        report(result.state);
      }
      result.onchange = function () {
        report(result.state);
      };
    });
  }

  const changeCenter = () => {
    console.log('changed');
  };

  function report(state) {
    console.log('Permission ' + state);
  }

  if (loadError) return 'Error';
  if (!isLoaded) return <div>Loading...</div>;

  const setLocation = (e) => {
    const place = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    console.log(place);
    setNewLocationCoords(place);
    setShowInfoBar(!showInfoBar);
  };

  // const defaultCenter = {
  //   lat: 65.012615,
  //   lng: 25.471453,
  // };

  // currentLocation ? { lat: +currentLocation.lat, lng: +currentLocation.lng } :
  // zoom={currentLocation ? 5 : 16}
  return (
    <div className="app">
      <Navigation />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" exact>
        <GoogleMap
          mapContainerStyle={{ width: '100vw', height: '92vh' }}
          zoom={zoom}
          // zoom={geoLocationGranted ? 16 : 5}
          center={
            // geoLocationGranted
            //   ? { lat: currentLocation.lat, lng: currentLocation.lng }
            //   :
            currentLocation
          }
          options={options}
          onDblClick={(e) => setLocation(e)}
          // ref={(map) => map && map.panTo({lat: currentLocation.lat, lng: currentLocation.lng})}
          // onCenterChanged={changeCenter}
        >
          {locations.map((place) => (
            <Marker
              key={place.lat}
              className="marker"
              position={{ lat: place.lat, lng: place.lng }}
              icon={{
                scaledSize: new window.google.maps.Size(30, 30),
                url: icon,
              }}
            />
          ))}
          {showInfoBar && <InfoBar newLocationCoords={newLocationCoords} />}
        </GoogleMap>
      </Route>
    </div>
  );
};

export default App;
