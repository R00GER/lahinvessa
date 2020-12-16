import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import LockIcon from '@material-ui/icons/Lock';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import logo from '../assets/logo2.png';
import theme from '../theme';
import registerService from '../services/register';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showError, setShowError] = useState({ message: '', type: '', show: false });

  const history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setShowError({ message: '', type: '', show: false });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setShowError({ message: '', type: '', show: false });
  };

  const handlePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
    setShowError({ message: '', type: '', show: false });
  };

  const register = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setShowError({
        message: 'Salasanan pitää sisältää vähintään 8 merkkiä',
        type: 'password',
        show: true,
      });
      return;
    }

    if (password === passwordAgain) {
      const newUser = {
        username,
        email,
        password,
      };

      try {
        await registerService.register(newUser);
        setPasswordAgain('');
        setPassword('');
        setEmail('');
        setUsername('');
        setShowError({ message: '', show: false });
        history.push('/login');
      } catch (error) {
        setShowError({ message: 'Käyttäjätunnus on varattu', type: 'username', show: true });
        setPasswordAgain('');
        setPassword('');
      }
    } else {
      setShowError({ message: 'Salasanat eivät täsmää', type: 'password', show: true });
    }
  };

  const useStyles = makeStyles(() => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    margin: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <motion.div animate={{ y: 30 }} transition={{ delay: 0.2 }} className={classes.paper}>
          <img src={logo} alt="Logo" height={120} className={classes.margin} />
          <Typography component="h1" variant="h5" className={classes.margin}>
            Rekisteröidy
          </Typography>
          <form onSubmit={register} className={classes.form} noValidate>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              error={showError.show && showError.type === 'username'}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Käyttäjätunnus"
              name="username"
              value={username}
              autoComplete="off"
              autoCapitalize="none"
              helperText={showError.type === 'username' && showError.message}
              onChange={(e) => handleUsername(e)}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Sähköpostiosoite"
              name="email"
              value={email}
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
              error={showError.show && showError.type === 'password'}
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
              autoComplete="off"
              helperText={showError.type === 'password' && showError.message}
              onChange={(e) => handlePassword(e)}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: '#717CB9' }} />
                  </InputAdornment>
                ),
              }}
              error={showError.show && showError.type === 'password'}
              variant="outlined"
              margin="normal"
              size="small"
              color="primary"
              required
              fullWidth
              name="password"
              label="Salasana uudelleen"
              type="password"
              id="passwordagain"
              value={passwordAgain}
              helperText={showError.type === 'password' && showError.message}
              onChange={(e) => handlePasswordAgain(e)}
            />
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                  >
                    Rekisteröidy
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
          </form>
        </motion.div>
      </ThemeProvider>
    </Container>
  );
};

export default Register;
