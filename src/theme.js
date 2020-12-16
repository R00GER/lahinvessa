/* purple(primary): #8127BA
pink(secondary): #C0467B
grey(info): #717CB9
blue(success): #0A95A8 */

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8127BA',
      light: '#B55AED',
      dark: '#4E0089',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#C0467B',
      light: '#F677AA',
      dark: '#8C0A4F',
      contrastText: '#FFF',
    },
    info: {
      main: '#717CB9',
      light: '#A2ABEC',
      dark: '#425089',
      contrastText: '#000',
    },
    success: {
      main: '#0A95A8',
      light: '#58C6DA',
      dark: '#006779',
      contrastText: '#000',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(to right top, #8127ba, #7547c0, #6d5cc1, #6c6dbf, #717cb9)',
      },
    },
  },
});

export default theme;
