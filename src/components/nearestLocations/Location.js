import React from 'react';
import PropTypes from 'prop-types';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import { icons } from '../../constants';

const Location = ({ location, reCenter }) => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: '40% 40% 15% 5%',
      gridTemplateRows: 'auto',
      alignItems: 'center',
      fontSize: '.9rem',
      padding: '.5rem',
      icons: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      },
      distance: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItem: 'center',
      },
      item: {
        borderBottom: '1px solid #C1E9E4',
      },
    },
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="nearest-locations-body-item"
      style={{ ...styles.grid, ...styles.grid.item }}
      onClick={() => reCenter(location.lat, location.lng)}
    >
      <div>{location.name}</div>
      <div style={styles.grid.icons}>
        <div style={{ color: '#717CB9' }}>{icons[location.type]}</div>
        <div style={{ color: '#717CB9' }}>{icons[location.payable]}</div>
        <div>
          {location && location.services.length
            ? location.services.map((service) =>
                service === 'inva' ? (
                  <AccessibleIcon key={service} fontSize="small" style={{ color: '#717CB9' }} />
                ) : (
                  <ChildFriendlyIcon key={service} fontSize="small" style={{ color: '#717CB9' }} />
                )
              )
            : null}
        </div>
      </div>
      <div style={styles.grid.distance}>
        {location.distance >= 1000
          ? `${(location.distance / 1000).toFixed(1)}km`
          : `${location.distance.toFixed(0)}m`}
      </div>
    </div>
  );
};

Location.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  reCenter: PropTypes.func.isRequired,
};

export default Location;
