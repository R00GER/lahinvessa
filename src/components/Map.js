import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import userIcon from '../assets/location.png';
import happy from '../assets/happy.png';
import neutral from '../assets/neutral.png';
import love from '../assets/love.png';
import sad from '../assets/sad.png';
import mapStyles from '../mapStyles';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  disableDoubleClickZoom: true,
};

const defaultCenter = {
  lat: 65.46424547600593,
  lng: 25.52416717947721,
};

const Map = ({ zoom, setNewLocation, userLocation, locations, selectLocation, center }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const selectIcons = (rating) => {
    if (rating === 0) {
      return happy;
    }

    if (rating <= 1) {
      return sad;
    }

    if (rating < 3) {
      return neutral;
    }

    if (rating >= 4) {
      return love;
    }

    return happy;
  };

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      zoom={userLocation ? zoom : 5}
      center={center || defaultCenter}
      options={options}
      onClick={(e) => setNewLocation(e)}
    >
      {userLocation && (
        <Marker
          className="location-marker"
          position={{ lat: userLocation.lat, lng: userLocation.lng }}
          icon={{
            scaledSize: new window.google.maps.Size(35, 35),
            url: userIcon,
          }}
        />
      )}
      {locations.map((location) => {
        return (
          <Marker
            key={location.id || location.lat}
            className="marker"
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              scaledSize: new window.google.maps.Size(38, 38),
              url: selectIcons(location.rating),
            }}
            onClick={() => selectLocation(location)}
          />
        );
      })}
    </GoogleMap>
  );

  if (loadError) {
    return 'Error';
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};

Map.defaultProps = {
  center: null,
  userLocation: null,
};

Map.propTypes = {
  zoom: PropTypes.number.isRequired,
  setNewLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.instanceOf(Object),
  locations: PropTypes.instanceOf(Array).isRequired,
  selectLocation: PropTypes.func.isRequired,
  center: PropTypes.instanceOf(Object),
};

export default Map;
