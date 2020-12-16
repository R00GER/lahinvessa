import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import happy from '../assets/happy.png';

const AddToLocation = ({ setNewLocationToUsersLocation }) => {
  const styles = {
    container: {
      position: 'absolute',
      bottom: '11%',
      right: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '.8rem',
      backgroundColor: '#80BDC6',
      borderRadius: '500px',
    },
    icon: {
      color: '#fff',
    },
  };
  return (
    <Fab style={styles.container} size="small" onClick={setNewLocationToUsersLocation}>
      <AddIcon style={styles.icon} />
    </Fab>
  );
};

AddToLocation.propTypes = {
  setNewLocationToUsersLocation: PropTypes.func.isRequired,
};

export default AddToLocation;
