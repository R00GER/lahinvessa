import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';

import WcIcon from '@material-ui/icons/Wc';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
// import ApartmentIcon from '@material-ui/icons/Apartment';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';

import locationsService from '../services/locations';
import '../App.css';

const NewLocationForm = ({
  newLocationCoords,
  toggleInfoBar,
  buttonLabelAdd,
  buttonLabelCancel,
  removePlaceholderLocation,
}) => {
  const [servicesChecked, setServicesChecked] = useState({
    inva: false,
    child: false,
  });
  const [newLocation, setNewLocation] = useState({
    name: '',
    type: '',
    payable: '',
    services: [],
    validated: false,
    lat: newLocationCoords.lat,
    lng: newLocationCoords.lng,
    rating: 3,
    ratings: 0,
  });

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto',
      backgroundColor: '#85cad4',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      height: '45vh',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  };

  const handleNewLocation = (e) => {
    const { name, value } = e.target;

    if (value === 'inva') {
      setServicesChecked({ ...servicesChecked, inva: !servicesChecked.inva });
    }

    if (value === 'child') {
      setServicesChecked({ ...servicesChecked, child: !servicesChecked.child });
    }

    if (value === 'inva' && !newLocation.services.includes('inva')) {
      setNewLocation({
        ...newLocation,
        services: newLocation.services.concat(value),
      });
    }

    if (value === 'inva' && newLocation.services.includes('inva')) {
      setNewLocation({
        ...newLocation,
        services: newLocation.services.filter((service) => service !== value),
      });
    }

    if (value === 'child' && !newLocation.services.includes('child')) {
      setNewLocation({
        ...newLocation,
        services: newLocation.services.concat(value),
      });
    }

    if (value === 'child' && newLocation.services.includes('child')) {
      setNewLocation({
        ...newLocation,
        services: newLocation.services.filter((service) => service !== value),
      });
    }

    if (name !== 'service') {
      setNewLocation({
        ...newLocation,
        [name]: value,
      });
    }
  };

  const addNewLocation = async (e) => {
    e.preventDefault();
    await locationsService.createNewLocation(newLocation);
    toggleInfoBar();
  };

  const resetNewLocation = () => {
    removePlaceholderLocation({ lat: newLocation.lat, lng: newLocation.lng });
    setNewLocation({
      name: '',
      type: '',
      payable: '',
      services: [],
      validated: false,
      lat: newLocationCoords.lat,
      lng: newLocationCoords.lng,
      rating: 3,
      ratings: 0,
    });
    toggleInfoBar();
  };

  return (
    <div className="infobar-container" style={styles.container}>
      <form onSubmit={addNewLocation} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          className="new-location-name-input"
          label="Nimi"
          name="name"
          value={newLocation.name}
          size="small"
          style={{ backgroundColor: '#85cad4', margin: '.5rem 0 .5rem 0' }}
          onChange={(e) => handleNewLocation(e)}
          variant="outlined"
          required
        />
        <div style={{ marginTop: '.5rem' }}>
          <FormLabel component="legend" style={{ color: '#fff' }}>
            Tyyppi
          </FormLabel>
          <RadioGroup style={{ justifyContent: 'space-around' }} row>
            <FormControlLabel
              control={<Radio style={{ color: '#fff' }} />}
              name="type"
              value="public"
              checked={newLocation.type === 'public'}
              onChange={(e) => handleNewLocation(e)}
              label={<WcIcon style={{ color: '#fff' }} />}
              size="small"
            />
            <FormControlLabel
              control={<Radio style={{ color: '#fff' }} />}
              name="type"
              value="restaurant"
              checked={newLocation.type === 'restaurant'}
              onChange={(e) => handleNewLocation(e)}
              label={<RestaurantIcon style={{ color: '#fff' }} />}
              size="small"
            />
            <FormControlLabel
              control={<Radio style={{ color: '#fff' }} />}
              name="type"
              value="hotel"
              checked={newLocation.type === 'hotel'}
              onChange={(e) => handleNewLocation(e)}
              label={<HotelIcon style={{ color: '#fff' }} />}
              size="small"
            />
            <FormControlLabel
              control={<Radio style={{ color: '#fff' }} />}
              name="type"
              value="cafe"
              checked={newLocation.type === 'cafe'}
              onChange={(e) => handleNewLocation(e)}
              label={<FreeBreakfastIcon style={{ color: '#fff' }} />}
              size="small"
            />
            <FormControlLabel
              control={<Radio style={{ color: '#fff' }} />}
              name="type"
              value="other"
              checked={newLocation.type === 'other'}
              onChange={(e) => handleNewLocation(e)}
              label={<NotListedLocationIcon style={{ color: '#fff' }} />}
              size="small"
            />
          </RadioGroup>
        </div>
        <div style={{ marginTop: '.5rem' }}>
          <FormLabel component="legend" style={{ color: '#fff' }}>
            Lisäpalvelut
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: '#fff' }}
                  name="service"
                  value="inva"
                  checked={servicesChecked.inva}
                  onChange={(e) => handleNewLocation(e)}
                />
              }
              label={<AccessibleIcon style={{ color: '#fff' }} />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="service"
                  value="child"
                  checked={servicesChecked.child}
                  onChange={(e) => handleNewLocation(e)}
                  style={{ color: '#fff' }}
                />
              }
              label={<ChildFriendlyIcon style={{ color: '#fff' }} />}
            />
          </FormGroup>
          <div style={{ color: '#fff', marginTop: '.5rem' }}>
            <RadioGroup row>
              <FormControlLabel
                control={
                  <Radio
                    name="payable"
                    value="payable"
                    checked={newLocation.payable === 'payable'}
                    onChange={(e) => handleNewLocation(e)}
                    style={{ color: '#fff' }}
                  />
                }
                label="Maksullinen"
                style={{ fontWeight: 300 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    name="payable"
                    value="free"
                    checked={newLocation.payable === 'free'}
                    onChange={(e) => handleNewLocation(e)}
                    style={{ color: '#fff' }}
                  />
                }
                label="Maksuton"
                style={{ fontWeight: 300 }}
              />
            </RadioGroup>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '1.5rem',
            fontWeight: 300,
          }}
        >
          <button className="btn-add" type="submit">
            {buttonLabelAdd}
          </button>
          <button className="btn-cancel" type="button" onClick={resetNewLocation}>
            {buttonLabelCancel}
          </button>
        </div>
      </form>
    </div>
  );
};

NewLocationForm.propTypes = {
  newLocationCoords: PropTypes.instanceOf(Object).isRequired,
  toggleInfoBar: PropTypes.func.isRequired,
  buttonLabelAdd: PropTypes.string.isRequired,
  buttonLabelCancel: PropTypes.string.isRequired,
  removePlaceholderLocation: PropTypes.func.isRequired,
};

export default NewLocationForm;
