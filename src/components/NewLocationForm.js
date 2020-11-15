import React, { useState } from 'react';
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import { Checkbox } from '@rmwc/checkbox';
import '@material/checkbox/dist/mdc.checkbox.css';
// import { FormField } from '@rmwc/formfield';
import { TextField } from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.css';
import { Radio } from '@rmwc/radio';
import '@material/radio/dist/mdc.radio.css';

import WcIcon from '@material-ui/icons/Wc';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import ApartmentIcon from '@material-ui/icons/Apartment';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import AccessibleIcon from '@material-ui/icons/Accessible';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';

import '@material/textfield/dist/mdc.textfield.css';
// import '@rmwc/textfield/styles';
import locationsService from '../services/locations';

const NewLocationForm = ({ newLocationCoords }) => {
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
  });

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
    } else if (value === 'inva' && newLocation.services.includes('inva')) {
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
    } else if (value === 'child' && newLocation.services.includes('child')) {
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

  console.log(newLocation);

  const addNewLocation = async (e) => {
    e.preventDefault();
    const response = await locationsService.createNewLocation(newLocation);
    console.log(response);
  };

  return (
    <form onSubmit={addNewLocation} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        className="new-location-name-input"
        label="Nimi"
        name="name"
        value={newLocation.name}
        size="12"
        style={{ backgroundColor: '#85cad4' }}
        onChange={(e) => handleNewLocation(e)}
      />
      <div>
        <div style={{ color: '#fff', paddingLeft: '1rem' }}>
          <strong>Tyyppi</strong>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '.5rem',
          }}
        >
          <Radio
            name="type"
            value="public"
            checked={newLocation.type === 'public'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff', outline: '#fff' }}
          >
            <WcIcon />
          </Radio>
          <Radio
            name="type"
            value="restaurant"
            checked={newLocation.type === 'restaurant'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <RestaurantIcon />
          </Radio>
          <Radio
            name="type"
            value="hotel"
            checked={newLocation.type === 'hotel'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <HotelIcon />
          </Radio>
          <Radio
            name="type"
            value="cafe"
            checked={newLocation.type === 'cafe'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <FreeBreakfastIcon />
          </Radio>
          <Radio
            name="type"
            value="shopping"
            checked={newLocation.type === 'shopping'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <ApartmentIcon />
          </Radio>
          <Radio
            name="type"
            value="other"
            checked={newLocation.type === 'other'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <NotListedLocationIcon />
          </Radio>
        </div>
        <div style={{ color: '#fff', paddingLeft: '1rem' }}>
          <strong>Lisäpalvelut</strong>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '.5rem',
          }}
        >
          <Checkbox
            name="service"
            value="inva"
            checked={servicesChecked.inva}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff', outline: '#fff' }}
          >
            <AccessibleIcon />
          </Checkbox>
          <Checkbox
            name="service"
            value="child"
            checked={servicesChecked.child}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
          >
            <ChildFriendlyIcon />
          </Checkbox>
        </div>
        <div style={{ display: 'flex', color: '#fff', padding: '.5rem' }}>
          <Radio
            name="payable"
            value={'payable'}
            checked={newLocation.payable === 'payable'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}
          >
            Maksullinen
          </Radio>
          <Radio
            name="payable"
            value={'free'}
            checked={newLocation.payable === 'free'}
            onChange={(e) => handleNewLocation(e)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Maksuton
          </Radio>
        </div>
      </div>
      <div style={{ margin: '0 auto', marginTop: '1rem' }}>
        <button className="btn btn-add" type="submit">
          Lisää vessa
        </button>
      </div>
    </form>
  );
};

export default NewLocationForm;
