import React from 'react';
// import React, { useState } from 'react';

const Login = () => (
  // useState!! useState on reactin hookki (hooks), katsokaa esimerkkejä, joissa ei ole class syntaksi
  // const [email, setEmail] = useState('')
  // email = muuttuja, johon tila tallennetaan
  // setEmail = functio, jolla tilaa muutetaan
  // setEmail('esimerkkiteksi') // nyt tila on seimerkkiteksti

  // const handleEmail = (e) => {
  //   setEmail(e.target.value) emailin tila on nyt se mitä input kenttään syötetään
  // }

  // TOISTA SAMA KAIKILLE INPUTEILLE
  // CONTROLLED COMPONENTS

  // KOODIA
  <form>
    {/* <input value={email} onChange={(e) => handleEmail(e)} /> */}
    {/* input arvo on sidottu value attribuuttiin
            onChange eventhandleriin on tehty funktio (handleri), jota kutsutaan aina inpun arvon muuttuessa
            handlerille välitetään event objekti, jonka kautta päästään käsiksi input arvoon (value)
            e.target.value = inpun arvo
        */}
  </form>
);
export default Login;
