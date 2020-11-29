import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from '@react-google-maps/api';
import userIcon from '../assets/location.png';
import icon from '../assets/poop1.png';
import mapStyles from '../mapStyles';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  disableDoubleClickZoom: true,
};

const Map = ({
  zoom,
  setNewLocation,
  userLocation,
  locations,
  selectLocation,
  center,
  isLoaded,
  loadError,
}) => {
  console.log('locations from MAP', locations, 'length: ', locations.length);
  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
        zoom={zoom}
        center={center || userLocation}
        options={options}
        onClick={(e) => setNewLocation(e)}
      >
        <Marker
          className="location-marker"
          position={{ lat: userLocation.lat, lng: userLocation.lng }}
          icon={{
            scaledSize: new window.google.maps.Size(40, 40),
            url: userIcon,
          }}
        />
        {locations.map((location) => {
          console.log(location);
          return (
            <Marker
              key={location.id || location.lat}
              className="marker"
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                scaledSize: new window.google.maps.Size(40, 40),
                url: icon,
              }}
              onClick={() => selectLocation(location)}
            />
          );
        })}
      </GoogleMap>
    );
  };

  if (loadError) {
    return 'Error';
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};

Map.defaultProps = {
  center: null,
  loadError: undefined,
};

Map.propTypes = {
  zoom: PropTypes.number.isRequired,
  setNewLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.instanceOf(Object).isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
  selectLocation: PropTypes.func.isRequired,
  center: PropTypes.instanceOf(Object),
  isLoaded: PropTypes.bool.isRequired,
  loadError: PropTypes.bool,
};

export default Map;
