import React from 'react';
import WcIcon from '@material-ui/icons/Wc';
import Restaurant from '@material-ui/icons/Restaurant';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import MoneyOffOutlinedIcon from '@material-ui/icons/MoneyOffOutlined';

export const icons = {
  public: <WcIcon fontSize="small" />,
  restaurant: <Restaurant fontSize="small" />,
  cafe: <FreeBreakfastIcon fontSize="small" />,
  other: <NotListedLocationIcon fontSize="small" />,
  payable: <AttachMoneyOutlinedIcon fontSize="small" />,
  free: <MoneyOffOutlinedIcon fontSize="small" />,
};

export const translations = {
  public: 'Julkinen',
  restaurant: 'Ravintola',
  cafe: 'Kahvila',
  other: 'Ei tiedossa',
  payable: 'Kyllä',
  free: 'Ei',
};
