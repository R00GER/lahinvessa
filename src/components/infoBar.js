import React from 'react';
import NewLocationForm from './NewLocationForm';

const InfoBar = ({ showInfoBar, newLocationCoords }) => {
  const styles = {
    container: {
      backgroundColor: '#85cad4',
      height: '50vh',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  };
  return <div className="infobar-container" style={styles.container}>
    <NewLocationForm newLocationCoords={newLocationCoords} />
  </div>;
};

export default InfoBar;
