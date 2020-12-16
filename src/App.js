import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import calculateDistances from './helpers/distances';
import Notification from './components/Notification';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import locationService from './services/locations';
import Navigation from './components/Navigation';
import NewLocationForm from './components/NewLocationForm';
import NearestLocations from './components/nearestLocations/NearestLocations';
import SelectedLocation from './components/selectedLocation/SelectedLocation';
import Login from './pages/Login';
import Register from './pages/Register';
import AddToLocation from './components/AddToLocation';
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [newLocationCoords, setNewLocationCoords] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [showAddNew, setShowAddNewForm] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [errorNotification, setErrorNotification] = useState({ message: '', show: false });
  const [locationPermissions, setLocationPermissions] = useState(false);

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: +pos.coords.latitude,
      lng: +pos.coords.longitude,
    };
  };

  useEffect(() => {
    const handlePermission = async () => {
      const coords = await getCoords();
      const result = await navigator.permissions.query({ name: 'geolocation' });
      const response = await locationService.getValidatedLocations();
      setLocations(locations.concat(response));

      if (result.state === 'granted') {
        setUserLocation(coords);
        setCenter(coords);
        setLocationPermissions(true);
        setZoom(16);
        // setLocations(locations.map((location) => calculateDistances(location, coords)));
      } else {
        setLocationPermissions(false);
      }
    };
    handlePermission();
  }, []);

  useEffect(() => {
    setLocations(locations.map((location) => calculateDistances(location, userLocation)));
  }, [userLocation]);

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem('user'));

    if (userLoggedIn) {
      setUser(userLoggedIn);
      locationService.setToken(userLoggedIn.token);
    }
  }, []);

  const timer = {
    time: null,
  };

  const handleErrorNotifications = (message, show) => {
    clearTimeout(timer.time);
    setErrorNotification({ message, show });
    timer.time = setTimeout(() => setErrorNotification({ message: '', show: false }), 5000);
  };

  const handleLogin = (userLoggedIn) => {
    if (user) {
      localStorage.removeItem('user');
      setUser(null);
    }

    localStorage.setItem('user', JSON.stringify(userLoggedIn));
    setUser(userLoggedIn);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const setNewLocationToUsersLocation = () => {
    if (user) {
      const newLocation = {
        lat: userLocation.lat,
        lng: userLocation.lng,
      };
      setLocations(locations.concat(newLocation));
      setNewLocationCoords(newLocation);
      setShowAddNewForm(true);
      setLocationDetails(null);
    } else {
      handleErrorNotifications('Kirjaudu sisään lisätäksesi uuden kohteen', true);
    }
  };

  const setNewLocation = (e) => {
    if (newLocationCoords) {
      return;
    }

    if (user) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      setCenter({ lat: newLocation.lat, lng: newLocation.lng });
      setLocations(locations.concat(newLocation));
      setNewLocationCoords(newLocation);
      setShowAddNewForm(true);
      setLocationDetails(null);
    } else {
      handleErrorNotifications('Kirjaudu sisään lisätäksesi uuden kohteen', true);
    }
  };

  const reCenter = (lat, lng) =>
    lat && lng
      ? setCenter({ lat, lng })
      : setCenter({ lat: userLocation.lat, lng: userLocation.lng });

  const removePlaceholderLocation = (locationToRemove) => {
    setLocations(
      locations.filter(
        (location) => location.lat !== locationToRemove.lat && location.lng !== locationToRemove.lng
      )
    );
  };

  const resetNewLocationCoords = () => {
    setNewLocationCoords(null);
  };

  const toggleAddNewForm = () => {
    setShowAddNewForm(!showAddNew);
  };

  const selectLocation = (location) => {
    if (location && !showAddNew) {
      if (!location.name) {
        handleErrorNotifications('Lisäämäsi kohde odottaa hyväksyntää', true);
      }
      setLocationDetails(location);
      setCenter({ lat: location.lat, lng: location.lng });
    } else {
      setLocationDetails(null);
      setCenter({ lat: userLocation.lat, lng: userLocation.lng });
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

  return (
    <div className="app">
      {errorNotification && errorNotification.show && (
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
        {showAddNew && (
          <NewLocationForm
            buttonLabelAdd="Lisää"
            buttonLabelCancel="Peruuta"
            newLocationCoords={newLocationCoords}
            toggleAddNewForm={toggleAddNewForm}
            removePlaceholderLocation={removePlaceholderLocation}
            handleErrorNotifications={handleErrorNotifications}
            logOut={logOut}
            resetNewLocationCoords={resetNewLocationCoords}
          />
        )}
        <NearestLocations
          locationPermissions={locationPermissions}
          locationDetails={locationDetails}
          locations={locations}
          selectLocation={selectLocation}
          reCenter={reCenter}
        />
        {locationDetails && (
          <SelectedLocation
            locationDetails={locationDetails}
            showAddNew={showAddNew}
            selectLocation={selectLocation}
            updateLocation={updateLocation}
            toggleAddNewForm={toggleAddNewForm}
            handleErrorNotifications={handleErrorNotifications}
          />
        )}
      </Route>
      <AddToLocation setNewLocationToUsersLocation={setNewLocationToUsersLocation} />
    </div>
  );
};

export default App;
