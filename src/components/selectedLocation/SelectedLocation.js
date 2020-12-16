import React, { useState } from 'react';
import PropTypes from 'prop-types';
import locationService from '../../services/locations';
import Header from './Header';
import Body from './Body';

const SelectedLocation = ({ locationDetails, selectLocation, updateLocation, showAddNew }) => {
  const [rating, setRating] = useState(locationDetails.rating || 3);
  const [rated, setRated] = useState(false);

  const styles = {
    container: {
      backgroundColor: '#fff',
      height: '45vh',
      width: '98%',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 0)',
      zIndex: 6,
    },
  };

  const handleRating = async (e) => {
    const ratedLocation = {
      ...locationDetails,
      ratings: !locationDetails.rating
        ? [+e.target.value]
        : [...locationDetails.ratings, +e.target.value],
    };

    const response = await locationService.updateLocation(ratedLocation);
    setRating(response.rating);
    setRated(true);

    if (locationDetails.distance) {
      updateLocation({ ...response, distance: locationDetails.distance });
      selectLocation({ ...response, distance: locationDetails.distance });
    }
  };

  return showAddNew ? null : (
    <div className="selected-location-container" style={styles.container}>
      <Header locationDetails={locationDetails} selectLocation={selectLocation} />
      <Body
        locationDetails={locationDetails}
        rating={rating}
        rated={rated}
        handleRating={(e) => handleRating(e)}
      />
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
  showAddNew: PropTypes.bool.isRequired,
};

export default SelectedLocation;
