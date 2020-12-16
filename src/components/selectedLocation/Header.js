import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ locationDetails, selectLocation }) => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '.5rem',
      paddingRight: '.5rem',
      height: '20%',
      color: '#fff',
      marginBottom: '1rem',
      backgroundColor: '#85cad4',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      opacity: '.87',
      itemsRight: {
        display: 'flex',
        item: {
          marginLeft: '1rem',
        },
      },
    },
  };

  return (
    <div
      className="selected-location-header"
      style={styles.header}
      role="button"
      tabIndex={0}
      onClick={() => selectLocation()}
    >
      {locationDetails && (
        <div className="selected-location-header-name">{locationDetails.name}</div>
      )}
      <div style={styles.header.itemsRight}>
        <div className="selected-location-header-distance" style={styles.header.itemsRight.item}>
          {locationDetails.distance >= 1000
            ? `${(locationDetails.distance / 1000).toFixed(1)} km`
            : `${locationDetails.distance.toFixed(0)} m`}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  locationDetails: PropTypes.instanceOf(Object).isRequired,
  selectLocation: PropTypes.func.isRequired,
};

export default Header;
