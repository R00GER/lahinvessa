import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Radio,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import WcIcon from '@material-ui/icons/Wc';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import theme from '../theme';
import locationsService from '../services/locations';

const NewLocationForm = ({
  newLocationCoords,
  toggleAddNewForm,
  buttonLabelAdd,
  buttonLabelCancel,
  removePlaceholderLocation,
  handleErrorNotifications,
  logOut,
  resetNewLocationCoords,
}) => {
  const [showError, setShowError] = useState({ message: '', show: false });
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
    rating: null,
    ratings: [],
  });

  const styles = {
    container: {
      backgroundColor: '#fff',
      height: '50vh',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 3,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '.5rem',
      height: '18%',
      color: '#fff',
      backgroundColor: '#85cad4',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      fontSize: '1.2rem',
      fontWeight: '300',
      opacity: '.87',
    },
  };

  const useStyles = makeStyles(() => ({
    container: {
      height: '80%',
      display: 'flex',
      alignItems: 'space-around',
      padding: '.5rem',
      color: '#757575',
    },
    button: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
    formControl: {
      width: '100%',
    },
    typography: {
      color: '',
    },
  }));

  const handleNewLocation = (e) => {
    const { name, value } = e.target;

    if (location.name.length > 18) {
      setShowError({ message: 'Kohteen nimen maksimipituus on 20 merkkiä', show: true });
    } else {
      setShowError({ message: '', show: false });
    }

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
      rating: null,
      ratings: [],
    });
    toggleAddNewForm();
    resetNewLocationCoords();
  };

  const addLocation = async (e) => {
    e.preventDefault();

    try {
      await locationsService.createNewLocation(location);
      toggleAddNewForm();
      resetNewLocationCoords();
    } catch (error) {
      removePlaceholderLocation({ lat: location.lat, lng: location.lng });
      toggleAddNewForm();
      handleErrorNotifications(
        'Istuntosi on vanhentunut. Kirjaudu sisään lisätäksesi vessan.',
        true
      );

      logOut();
    }
  };

  const classes = useStyles();

  return (
    <form style={styles.container} onSubmit={addLocation}>
      <div style={styles.header}>Lisää kohde</div>
      <Grid className={classes.container} container>
        <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
              size="small"
              color="primary"
              required
              fullWidth
              name="name"
              label="Nimi"
              autoComplete="off"
              autoCapitalize="none"
              value={location.name}
              error={showError.show}
              helperText={showError.show && showError.message}
              onChange={(e) => handleNewLocation(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl} margin="dense">
              <InputLabel htmlFor="new-location-type">Tyyppi</InputLabel>
              <Select
                native
                value={location.type}
                onChange={(e) => handleNewLocation(e)}
                label="Tyyppi"
                inputProps={{
                  name: 'type',
                  id: 'new-location-type',
                }}
              >
                <option aria-label="None" value="" disabled hidden />
                <option value="public">Julkinen</option>
                <option value="restaurant">Ravintola</option>
                <option value="cafe">Kahvila</option>
                <option value="other">Muu</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <FormLabel className={classes.formLabel} component="legend">
                Lisäpalvelut
              </FormLabel>
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Maksullinen</FormLabel>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <Grid container>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="service"
                      value="inva"
                      checked={servicesChecked.inva}
                      onChange={(e) => handleNewLocation(e)}
                    />
                  }
                  label={<AccessibleIcon style={{ color: '#717CB9' }} />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="service"
                      value="child"
                      checked={servicesChecked.child}
                      onChange={(e) => handleNewLocation(e)}
                    />
                  }
                  label={<ChildFriendlyIcon style={{ color: '#717CB9' }} />}
                />
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup>
              <Grid container>
                <FormControlLabel
                  control={
                    <Radio
                      name="payable"
                      value="payable"
                      checked={location.payable === 'payable'}
                      onChange={(e) => handleNewLocation(e)}
                    />
                  }
                  label="Kyllä"
                  style={{ fontWeight: 300 }}
                />
                <FormControlLabel
                  control={
                    <Radio
                      name="payable"
                      value="free"
                      checked={location.payable === 'free'}
                      onChange={(e) => handleNewLocation(e)}
                    />
                  }
                  style={{ fontWeight: 300 }}
                  label={<Typography className={classes.typography}>Ei</Typography>}
                />
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-around" alignItems="flex-end">
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  {buttonLabelAdd}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={resetNewLocation}
                >
                  {buttonLabelCancel}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </form>
  );
};

NewLocationForm.propTypes = {
  newLocationCoords: PropTypes.instanceOf(Object).isRequired,
  toggleAddNewForm: PropTypes.func.isRequired,
  buttonLabelAdd: PropTypes.string.isRequired,
  buttonLabelCancel: PropTypes.string.isRequired,
  removePlaceholderLocation: PropTypes.func.isRequired,
  handleErrorNotifications: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  resetNewLocationCoords: PropTypes.func.isRequired,
};

export default NewLocationForm;
