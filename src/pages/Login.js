import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Button,
  Link as StyledLink,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import theme from '../theme';
import logo from '../assets/logo2.png';
import loginService from '../services/login';
import locationsService from '../services/locations';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState({ message: '', show: false });

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setShowError({ message: '', show: false });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setShowError({ message: '', show: false });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!(email && password)) {
      setShowError({ message: 'Pakollinen kenttä', show: true });
      return;
    }

    const credentials = {
      email,
      password,
    };

    try {
      const user = await loginService.login(credentials);

      if (user.token) {
        history.push('/');
        handleLogin(user);
        locationsService.setToken(user.token);
      }
    } catch (error) {
      setShowError({ message: 'Virheellinen käyttäjätunnus tai salasana', show: true });
    }
  };

  const useStyles = makeStyles(() => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    margin: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <motion.div className={classes.paper} animate={{ y: 70 }} transition={{ delay: 0.2 }}>
          <img src={logo} alt="Logo" height={120} theme={theme.margin} />
          <Typography component="h1" variant="h5">
            Kirjaudu sisään
          </Typography>
          <form onSubmit={login} className={classes.form} noValidate>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              error={showError.show}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Sähköpostiosoite"
              name="email"
              value={email}
              helperText={showError.message}
              autoComplete="off"
              autoCapitalize="none"
              onChange={(e) => handleEmail(e)}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              error={showError.show}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Salasana"
              type="password"
              id="password"
              value={password}
              helperText={showError.message}
              onChange={(e) => handlePassword(e)}
            />
            <Grid container>
              <Grid item xs={6}>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                  >
                    Kirjaudu
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={6}>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={() => history.push('/')}
                  >
                    Peruuta
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <StyledLink to="/" variant="body2" color="inherit">
                  Unohditko salasanasi?
                </StyledLink>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2" color="inherit">
                  Luo tunnukset täältä
                </Link>
              </Grid>
            </Grid>
          </form>
        </motion.div>
      </ThemeProvider>
    </Container>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
