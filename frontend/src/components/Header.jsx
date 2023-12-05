import React, { useState } from 'react';
import siteLogo from "../images/siteLogo.png"
import { Link } from 'react-router-dom';


function Header() {

  return (
    <div className='headerContainer'>
        <div className='logoContainer'>
            <Link to='/'>
            <img src ={siteLogo} alt='Burger Bliss' className='siteLogo' />
            </Link>
            <Link to='/' className='headerTitle'> <h1  className='headerTitle'>Burger Bliss Data Analysis </h1>  </Link>
        </div>
    </div>
  );
}

export default Header;






