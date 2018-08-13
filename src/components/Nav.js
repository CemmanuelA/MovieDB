import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <div className="navContainer">
      <ul className="nav">
        <li> <img className="logo" src="assets/logo.png" /> </li>
        <li><Link to='/movies'> Movies </Link></li>
        <li><Link to='/series'> Series </Link></li>
        <li>Favorites</li>
      </ul>
    </div>
  );
}

export default Nav;
