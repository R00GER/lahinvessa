import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import loginService from '../services/login';
import locationsService from '../services/locations';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [notification, setNotification] = useState('');

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await loginService.login(user);

      if (response.token) {
        history.push('/');
        handleLogin(response);
        locationsService.setToken(response.token);
      }
    } catch (error) {
      // setNotification('Virheellinen käyttäjätunnus tai salasana');
    }
  };

  return (
    <div>
      <form onSubmit={login} className="login">
        <div>
          <h1 className="otsikko">Kirjaudu sisään</h1>
          <label htmlFor="email">
            Käyttäjätunnus:
            <input
              className="labelit"
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => handleEmail(e)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Salasana:
            <input
              className="labelit"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => handlePassword(e)}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-add">
            Kirjaudu sisään
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
