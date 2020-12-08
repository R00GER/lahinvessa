import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
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
// import HotelIcon from '@material-ui/icons/Hotel';
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
  handleErrorNotifications,
  logOut,
}) => {
  const [servicesChecked, setServicesChecked] = useState({
    inva: false,
    child: false,
  });
  const [location, setLocation] = useState({
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
      // gridTemplateColumns: '1fr',
      // gridTemplateRows: 'auto',
      backgroundColor: '#85cad4',
      // paddingRight: '.5rem',
      // paddingLeft: '.5rem',
      // paddingTop: '.5rem',
      // paddingBottom: '.5rem',
      padding: '.5rem',
      height: '50vh',
      // width: '100%',
      // flexGrow: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 3,
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

    if (value === 'inva' && !location.services.includes('inva')) {
      setLocation({
        ...location,
        services: location.services.concat(value),
      });
    }

    if (value === 'inva' && location.services.includes('inva')) {
      setLocation({
        ...location,
        services: location.services.filter((service) => service !== value),
      });
    }

    if (value === 'child' && !location.services.includes('child')) {
      setLocation({
        ...location,
        services: location.services.concat(value),
      });
    }

    if (value === 'child' && location.services.includes('child')) {
      setLocation({
        ...location,
        services: location.services.filter((service) => service !== value),
      });
    }

    if (name !== 'service') {
      setLocation({
        ...location,
        [name]: value,
      });
    }
  };

  const addLocation = async (e) => {
    e.preventDefault();
    try {
      await locationsService.createNewLocation(location);
    } catch (error) {
      console.log(error.response.data);
    }
    removePlaceholderLocation({ lat: location.lat, lng: location.lng });
    toggleInfoBar();
    handleErrorNotifications('Istuntosi on vanhentunut. Kirjaudu sisään lisätäksesi vessan.', true);
    logOut();
  };

  const resetNewLocation = () => {
    removePlaceholderLocation({ lat: location.lat, lng: location.lng });
    setLocation({
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
      <form onSubmit={addLocation}>
        <Grid container>
          <Grid item xs={12}>
            <FormLabel
              style={{
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: '300',
              }}
            >
              Lisää kohde
            </FormLabel>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '.5rem' }}>
            <TextField
              className="new-location-name-input"
              label="Nimi"
              name="name"
              value={location.name}
              size="small"
              // style={{ backgroundColor: '#85cad4', margin: '.5rem 0 .5rem 0' }}
              onChange={(e) => handleNewLocation(e)}
              // variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend" style={{ marginTop: '.5rem', color: '#fff' }}>
              Tyyppi
            </FormLabel>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup>
              <Grid container spacing={2} alignContent="center" justify="space-between">
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Radio size="small" style={{ color: '#fff' }} />}
                    name="type"
                    value="public"
                    checked={location.type === 'public'}
                    onChange={(e) => handleNewLocation(e)}
                    label={<WcIcon style={{ color: '#fff' }} />}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Radio size="small" style={{ color: '#fff' }} />}
                    name="type"
                    value="restaurant"
                    checked={location.type === 'restaurant'}
                    onChange={(e) => handleNewLocation(e)}
                    label={<RestaurantIcon style={{ color: '#fff' }} />}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Radio size="small" style={{ color: '#fff' }} />}
                    name="type"
                    value="cafe"
                    checked={location.type === 'cafe'}
                    onChange={(e) => handleNewLocation(e)}
                    label={<FreeBreakfastIcon style={{ color: '#fff' }} />}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Radio size="small" style={{ color: '#fff' }} />}
                    name="type"
                    value="other"
                    checked={location.type === 'other'}
                    onChange={(e) => handleNewLocation(e)}
                    label={<NotListedLocationIcon style={{ color: '#fff' }} />}
                    size="small"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend" style={{ marginTop: '.2rem', color: '#fff' }}>
              Lisäpalvelut
            </FormLabel>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Grid container>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: '#fff' }}
                      name="service"
                      value="inva"
                      checked={servicesChecked.inva}
                      onChange={(e) => handleNewLocation(e)}
                      size="small"
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
                      size="small"
                    />
                  }
                  label={<ChildFriendlyIcon style={{ color: '#fff' }} />}
                />
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup>
              <Grid container>
                <FormControlLabel
                  control={
                    <Radio
                      name="payable"
                      value="payable"
                      checked={location.payable === 'payable'}
                      onChange={(e) => handleNewLocation(e)}
                      style={{ color: '#fff' }}
                      size="small"
                    />
                  }
                  label="Maksullinen"
                  style={{ color: '#fff', fontWeight: 300 }}
                />
                <FormControlLabel
                  control={
                    <Radio
                      name="payable"
                      value="free"
                      checked={location.payable === 'free'}
                      onChange={(e) => handleNewLocation(e)}
                      style={{ color: '#fff' }}
                      size="small"
                    />
                  }
                  label="Maksuton"
                  style={{ color: '#fff', fontWeight: 300 }}
                />
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-around" alignItems="flex-end">
              <Grid item xs={4}>
                <button className="btn-add" type="submit">
                  {buttonLabelAdd}
                </button>
              </Grid>
              <Grid item xs={4}>
                <button className="btn-cancel" type="button" onClick={resetNewLocation}>
                  {buttonLabelCancel}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  handleErrorNotifications: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default NewLocationForm;
