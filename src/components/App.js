import '../styles/App.css';
import Header from './Header.js';
import Art from './Art.js';
import React, { useState } from 'react';
import Fade from '@material-ui/core/Fade';
import swal from 'sweetalert';

export default function App () {
  const [checked, setChecked] = useState(false);

  // if checked, and component fades in, display modal
  const handleChange = () => {
    setChecked((prev) => !prev);
    setTimeout(() => {
      swal({
        title: "Select a Mood to Set the Mood.",
        text: "Let us know how you're feeling tonight, and we'll match it perfectly!",
        button: "GOTCHA 👌",
      });
    }, 1500);
  }

  return (
    <div className='App'>
      <Header onChange={handleChange} hide={checked ? 'displayNone' : ''}/>
      <Fade in={checked}>
        <div elevation={4}>
          <div className={checked ? 'displayBlock' : 'displayNone'}>
            <Art />
          </div>
        </div>
      </Fade>
    </div>
  );
}