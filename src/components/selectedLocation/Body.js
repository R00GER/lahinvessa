import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import { withStyles } from '@material-ui/core/styles';
import { FaPoop } from 'react-icons/fa';
import { icons, translations } from '../../constants';

const PoopRating = withStyles({
  iconFilled: {
    color: '#8c4a38',
  },
})(Rating);

const Body = ({ locationDetails, rating, rated, handleRating }) => {
  const styles = {
    body: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '3fr',
      paddingRight: '1rem',
      paddingLeft: '1rem',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '.5rem 0 .5rem 0',
      borderBottom: '1px solid #C1E9E4',
    },
    icon: {
      color: '#717CB9',
    },
    margin: {
      marginRight: '.5rem',
    },
    services: {
      display: 'flex',
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0 .5rem 0',
    },
  };

  return (
    <div className="selected-location-body" style={styles.body}>
      <div className="selected-location-type" style={styles.item}>
        <div>Tyyppi:</div>
        <div style={styles.services}>
          <div style={styles.margin}>{translations[locationDetails.type]}</div>
          <div style={styles.icon}>{icons[locationDetails.type]}</div>
        </div>
      </div>
      <div className="selected-location-payable" style={styles.item}>
        <div>Maksullinen:</div>
        <div style={styles.services}>
          <div style={styles.margin}>{translations[locationDetails.payable]}</div>
          <div style={styles.icon}>{icons[locationDetails.payable]}</div>
        </div>
      </div>
      {locationDetails.services && (
        <div
          key={locationDetails.id}
          className="selected-location-services-container"
          style={styles.item}
        >
          <div className="selected-location-services-title">Lisäpalvelut:</div>
          <div className="selected-locations-services-icons" style={{ display: 'flex' }}>
            {locationDetails.services.map((service) => (
              <div key={service}>
                {service === 'inva' ? (
                  <AccessibleIcon style={styles.icon} />
                ) : (
                  <ChildFriendlyIcon style={styles.icon} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={styles.rating}>
        <PoopRating
          name="rating"
          value={rating}
          onChange={(e) => handleRating(e)}
          icon={<FaPoop size="1.8rem" style={{ marginRight: '.1rem' }} />}
          disabled={rated}
        />
        <div>{locationDetails.rating ? locationDetails.rating.toFixed(1) : 'Ei arvioitu'}</div>
      </div>
    </div>
  );
};

Body.defaultProps = {
  locationDetails: null,
};

Body.propTypes = {
  locationDetails: PropTypes.instanceOf(Object),
  rating: PropTypes.number.isRequired,
  rated: PropTypes.bool.isRequired,
  handleRating: PropTypes.func.isRequired,
};

export default Body;
