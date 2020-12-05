import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginService from '../services/login';
import locationsService from '../services/locations';

const Login = ({ handleUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    const response = await loginService.login(user);

    if (response.token) {
      history.push('/');
      handleUser(user);
      locationsService.setToken(response.token);
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

export default Login;
