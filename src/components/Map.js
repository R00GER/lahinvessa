import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import userIcon from '../assets/location.png';
import icon from '../assets/poop1.png';
import mapStyles from '../mapStyles';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  // gestureHandling: 'none',
};

const Map = ({
  zoom,
  selectedLocation,
  setNewLocation,
  userLocation,
  locations,
  selectLocation,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '84vh' }}
      zoom={zoom}
      center={
        selectedLocation
          ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
          : userLocation
      }
      options={options}
      onDblClick={(e) => setNewLocation(e)}
    >
      <Marker
        className="location-marker"
        position={{ lat: userLocation.lat, lng: userLocation.lng }}
        icon={{
          scaledSize: new window.google.maps.Size(40, 40),
          url: userIcon,
        }}
      />
      {locations.map((location) => (
        <Marker
          key={location._id}
          className="marker"
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            scaledSize: new window.google.maps.Size(40, 40),
            url: icon,
          }}
          onClick={() => selectLocation(location)}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
