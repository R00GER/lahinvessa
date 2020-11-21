import React, { useState } from 'react';

const SelectedLocation = ({ selectedLocation, selectLocation, locations }) => {
  const [showNearest, setShowNearest] = useState(false);

  const styles = {
    container: {
      position: 'absolute',
      bottom: 0,
      height: showNearest ? '45%' : '8%',
      width: '100%',
      backgroundColor: '#fff',
      // zIndex: 1,
    },
    // scrim: {
    //   position: 'absolute',
    //   bottom: '50%',
    //   height: selectedLocation ? '55%' : 0,
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
    },
  };

  const handleShowNearest = () => {
    setShowNearest(!showNearest);
  };

  return (
    <>
      {/* <div
        style={styles.scrim}
        className="nearest-locations-scrim"
        onClick={() => selectLocation(null)}
      ></div> */}
      <div
        style={styles.container}
        className="nearest-locations-container"
        onClick={handleShowNearest}
      >
        {locations && (
          <div style={styles.header} className="nearest-locations-header">
            <div className="nearest-locations-header-name">{locations[0].name}</div>
            <div className="nearest-locations-header-distance">
              {locations[0].distance <= 1000
                ? `${locations[0].distance.toFixed(0)}m`
                : `${locations[0].distance.toFixed(1) / 1000}km`}
            </div>
          </div>
        )}

        <div className="nearest-locations-body">
          {showNearest &&
            locations.slice(1, 5).map((location) => (
              <div
                key={location._id}
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
    </>
  );
};

export default SelectedLocation;
