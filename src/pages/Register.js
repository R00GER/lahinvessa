import React, { useState } from 'react';
import registerService from '../services/register';
// import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  // const [notification, setNotification] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();

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
      } catch (error) {
        console.log(error.response.data);
        // setNotification('Käyttäjätunnus on varattu');
        setPasswordAgain('');
        setPassword('');
      }
    } else {
      // setNotification('Salasanat eivät täsmää');
    }
  };

  return (
    <div>
      <form onSubmit={register} className="register">
        <div>
          <h1 className="otsikko">Rekisteröidy</h1>
          <label htmlFor="username">
            Käyttäjätunnus:
            <input
              className="labelit"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => handleUsername(e)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Sähköposti:
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
          <label htmlFor="password-confirmation">
            Salasana Uudelleen:
            <input
              className="labelit"
              name="password-confirmation"
              type="password"
              required
              value={passwordAgain}
              onChange={(e) => handlePasswordAgain(e)}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-add">
            Rekisteröidy
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
