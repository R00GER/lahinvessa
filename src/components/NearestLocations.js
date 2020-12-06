import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const NearestLocations = ({ locationDetails, locations }) => {
  const [showNearest, setShowNearest] = useState(false);
  // const [moving, setMoving] = useState(null);

  const styles = {
    container: {
      position: 'fixed',
      bottom: 0,
      // bottom: moving || 0,
      height: showNearest ? '45%' : '8%',
      width: '100%',
      backgroundColor: '#fff',
      zIndex: 1,
      opacity: '.85',
    },
    // scrim: {
    //   position: 'absolute',
    //   bottom: '50%',
    //   height: locationDetails ? '55%' : 0,
    //   width: '100%',
    //   top: 0,
    //   opacity: 1,
    // },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      height: showNearest ? '20%' : '100%',
      color: '#fff',
      backgroundColor: '#85cad4',
      itemsRight: {
        display: 'flex',
        item: {
          marginLeft: '1rem',
        },
      },
    },
  };

  const handleShowNearest = () => {
    setShowNearest(!showNearest);
  };

  return (
    <div
      style={styles.container}
      role="button"
      tabIndex={0}
      className="nearest-locations-container"
      onClick={handleShowNearest}
    >
      <div style={styles.header} className="nearest-locations-header" draggable="true">
        <div className="nearest-locations-header-name">
          {locations.length ? locations[0].name : null}
        </div>
        <div style={styles.header.itemsRight}>
          {locations.length ? (
            <div
              className="nearest-locations-header-distance"
              style={styles.header.itemsRight.item}
            >
              {locations[0].distance <= 1000
                ? `${locations[0].distance.toFixed(0)}m`
                : `${(locations[0].distance / 1000).toFixed(1)}km`}
            </div>
          ) : null}
          {locationDetails && (
            <ExpandMoreIcon
              onClick={() => handleShowNearest()}
              style={styles.header.itemsRight.item}
            />
          )}
        </div>
      </div>

      <div className="nearest-locations-body" draggable="true">
        {showNearest &&
          locations.slice(1, 5).map((location) => (
            <div
              key={location.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: '80%',
                padding: '1rem',
              }}
              className="nearest-locations-body-items"
            >
              <div style={{ color: 'black' }}>{location.name}</div>
              <div style={{ color: 'black' }}>
                {location.distance <= 1000
                  ? `${location.distance.toFixed(0)}m`
                  : `${(location.distance / 1000).toFixed(1)} km`}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

NearestLocations.defaultProps = {
  locationDetails: null,
};

NearestLocations.propTypes = {
  locationDetails: PropTypes.instanceOf(Object),
  // selectLocation: PropTypes.func.isRequired,
  locations: PropTypes.instanceOf(Array).isRequired,
};

export default NearestLocations;
