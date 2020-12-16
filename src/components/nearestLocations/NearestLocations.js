import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import Location from './Location';
import { icons } from '../../constants';

const NearestLocations = ({ locations, reCenter, locationPermissions }) => {
  const [showNearest, setShowNearest] = useState(false);

  const styles = {
    container: {
      position: 'fixed',
      bottom: 0,
      height: showNearest ? '45%' : '8%',
      width: '97%',
      backgroundColor: '#fff',
      zIndex: 1,
      opacity: '.9',
    },
    header: {
      height: showNearest ? '20%' : '100%',
      color: '#fff',
      backgroundColor: '#85cad4',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      icons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      distance: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    body: {
      height: '80%',
      display: 'grid',
    },
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

  const toggleNearest = () => {
    setShowNearest(!showNearest);
    reCenter();
  };

  return locationPermissions && locations ? (
    <div
      style={styles.container}
      role="button"
      tabIndex={0}
      className="nearest-locations-container"
    >
      <div
        style={{ ...styles.header, ...styles.grid }}
        role="button"
        tabIndex={0}
        className="nearest-locations-header"
        onClick={toggleNearest}
      >
        <div className="nearest-locations-header-name">
          {locations && locations.length ? locations[0].name : null}
        </div>
        {locations[0] ? (
          <div className="nearest-locations-header-icons" style={styles.grid.icons}>
            <div>{icons[locations[0].type]}</div>
            <div>{icons[locations[0].payable]}</div>
            <div>
              {locations[0].services && locations[0].services.length
                ? locations[0].services.map((service) =>
                    service === 'inva' ? (
                      <AccessibleIcon key={service} fontSize="small" />
                    ) : (
                      <ChildFriendlyIcon key={service} fontSize="small" />
                    )
                  )
                : null}
            </div>
          </div>
        ) : null}
        <div>
          {locationPermissions && locations && locations[0] && locations[0].distance ? (
            <div className="nearest-locations-header-distance" style={styles.grid.distance}>
              {locations[0].distance >= 1000
                ? `${(locations[0].distance / 1000).toFixed(1)}km`
                : `${locations[0].distance.toFixed(0)}m`}
            </div>
          ) : null}
        </div>
      </div>

      <div className="nearest-locations-body" style={styles.body}>
        {showNearest &&
          locations
            .slice(1, 4)
            .map((location) => (
              <Location key={location.id || location.lat} location={location} reCenter={reCenter} />
            ))}
      </div>
    </div>
  ) : (
    <div
      style={styles.container}
      role="button"
      tabIndex={0}
      className="nearest-locations-container"
    >
      <div
        style={{ ...styles.header, ...styles.grid, ...styles.header.icons }}
        role="button"
        tabIndex={0}
        className="nearest-locations-header"
      >
        <div>Salli sijaintitiedot nähdäksesi lähimmät vessat</div>
      </div>
    </div>
  );
};

NearestLocations.propTypes = {
  locations: PropTypes.instanceOf(Array).isRequired,
  reCenter: PropTypes.func.isRequired,
  locationPermissions: PropTypes.bool.isRequired,
};

export default NearestLocations;
