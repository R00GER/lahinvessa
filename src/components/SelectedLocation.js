import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { FaPoop } from 'react-icons/fa';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WcIcon from '@material-ui/icons/Wc';
// import RestaurantIcon from '@material-ui/icons/Restaurant';
// import HotelIcon from '@material-ui/icons/Hotel';
// import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
// import ApartmentIcon from '@material-ui/icons/Apartment';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import locationService from '../services/locations';

const PoopRating = withStyles({
  iconFilled: {
    color: '#8c4a38',
  },
})(Rating);

const SelectedLocation = ({ locationDetails, selectLocation, updateLocation }) => {
  // const [rating, setRating] = useState(locationDetails.rating || 3);
  const [rating, setRating] = useState(null);
  const [rated, setRated] = useState(false);

  const styles = {
    container: {
      backgroundColor: '#fff',
      height: '45vh',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 100,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      // justifyContent: 'space-between',
      padding: '.8rem 1rem .8rem 1rem',
      marginBottom: '1rem',
      backgroundColor: '#85cad4',
      itemsRight: {
        display: 'flex',
        item: {
          marginLeft: '1rem',
        },
      },
    },
    body: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '3fr',
      paddingRight: '1rem',
      paddingLeft: '1rem',
    },
  };

  const selectIcon = () => {
    switch (locationDetails.type) {
      case 'public':
        return <WcIcon />;
      case 'inva':
        return <AccessibleIcon />;
      default:
        return <NotListedLocationIcon />;
    }
  };

  const handleRating = async (e) => {
    const ratedLocation = {
      ...locationDetails,
      ratings: locationDetails.ratings + 1,
      rating: +e.target.value + locationDetails.rating,
    };

    const response = await locationService.updateLocation(ratedLocation);
    setRating(response.rating);
    updateLocation(response);
    selectLocation(response);
    setRated(true);
  };

  return (
    <div className="selected-location-container" style={styles.container}>
      <div className="selected-location-header" style={styles.header}>
        <div className="selected-location-header-name">{locationDetails.name}</div>
        <div style={styles.header.itemsRight}>
          <div className="selected-location-header-distance" style={styles.header.itemsRight.item}>
            {locationDetails.distance}
          </div>
          <ExpandMoreIcon
            onClick={() => selectLocation(null)}
            style={styles.header.itemsRight.item}
          />
        </div>
      </div>
      <div className="selected-location-body" style={styles.body}>
        <div className="selected-location-type">{selectIcon()}</div>
        <div className="selected-location-payable">
          {locationDetails.payable === 'payable' ? 'Maksullinen' : 'Maksuton'}
        </div>
        {locationDetails.services && (
          <div key={locationDetails.id} className="selected-location-services-container">
            <div className="selected-location-services-title">Lisäpalvelut</div>
            <div className="selected-locations-services-icons">
              {locationDetails.services.map((service) => (
                <div key={service}>
                  {service === 'inva' ? <AccessibleIcon /> : <ChildFriendlyIcon />}
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <div style={{ color: '#fff', marginRight: '1rem' }}>Arvioi vessa</div> */}
          {/* <div>Arvioi vessa</div> */}
          <PoopRating
            name="rating"
            value={rating}
            onChange={(e) => handleRating(e)}
            icon={<FaPoop size="1.8rem" style={{ marginRight: '.1rem' }} />}
            disabled={rated}
          />
          <div>{locationDetails.rating ? locationDetails.rating : 'Ei Arvioitu'}</div>
        </div>
      </div>
    </div>
  );
};

SelectedLocation.defaultProps = {
  locationDetails: null,
};

SelectedLocation.propTypes = {
  locationDetails: PropTypes.instanceOf(Object),
  selectLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

export default SelectedLocation;
