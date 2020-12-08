import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';
import calculateDistances from './helpers/distances';
import Notification from './components/Notification';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import locationService from './services/locations';
import Navigation from './components/Navigation';
import NewLocationForm from './components/NewLocationForm';
import NearestLocations from './components/NearestLocations';
import SelectedLocation from './components/SelectedLocation';
import Login from './pages/Login';
import Register from './pages/Register';
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
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [errorNotification, setErrorNotification] = useState({ message: '', show: false });

  useEffect(() => {
    const handlePermission = async () => {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
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

      setLocations(
        locations.concat(locationsWithDistances).sort((a, b) => a.distance - b.distance)
      );
    };
    getAllLocations();
  }, []);

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'));

    if (userLoggedIn) {
      setUser(userLoggedIn);
      locationService.setToken(userLoggedIn.token);
    }
  }, []);

  const handleErrorNotifications = (message, show) => {
    setErrorNotification({ message, show });
    setTimeout(() => {
      handleErrorNotifications(null);
    }, 5000);
  };

  const setNewLocation = (e) => {
    if (user) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setLocations(locations.concat(newLocation));
      setNewLocationCoords(newLocation);
      setShowInfoBar(true);
    } else {
      setErrorNotification({ message: 'Kirjaudu sisään lisätäksesi uuden kohteen', show: true });
    }
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
    if (location) {
      setLocationDetails(location);
      setCenter({ lat: location.lat, lng: location.lng });
    }
  };

  const updateLocation = (ratedLocation) => {
    setLocations(
      locations.map((location) => (location.name === ratedLocation.name ? ratedLocation : location))
    );
  };

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogin = (userLoggedIn) => {
    if (user) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userLoggedIn));
      setUser(userLoggedIn);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="app">
      {errorNotification.show && (
        <Notification
          errorNotification={errorNotification}
          handleErrorNotifications={handleErrorNotifications}
        />
      )}
      <Sidebar
        handleShowSidebar={handleShowSidebar}
        handleLogin={handleLogin}
        showSidebar={showSidebar}
        logOut={logOut}
      />
      <Navigation user={user} handleShowSidebar={handleShowSidebar} />
      <Route path="/login">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/" exact>
        <Map
          zoom={zoom}
          userLocation={userLocation}
          locations={locations}
          selectLocation={selectLocation}
          setNewLocation={setNewLocation}
          center={center}
        />
        {showInfoBar && (
          <NewLocationForm
            buttonLabelAdd="Lisää vessa"
            buttonLabelCancel="Peruuta"
            newLocationCoords={newLocationCoords}
            toggleInfoBar={toggleInfoBar}
            removePlaceholderLocation={removePlaceholderLocation}
            handleErrorNotifications={handleErrorNotifications}
            logOut={logOut}
          />
        )}
        <NearestLocations
          locationDetails={locationDetails}
          selectLocation={selectLocation}
          locations={locations}
          toggleInfoBar={toggleInfoBar}
        />
        {locationDetails && (
          <SelectedLocation
            locationDetails={locationDetails}
            selectLocation={selectLocation}
            updateLocation={updateLocation}
          />
        )}
      </Route>
    </div>
  );
};

export default App;
