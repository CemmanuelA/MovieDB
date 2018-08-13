import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <div className="navContainer">
      <ul className="nav">
        <li> <img className="logo" src="assets/logo.png" /> </li>
        <li style={{float: 'right'}}><Link to='/favorites'> Favorites </Link></li>
        <li style={{float: 'right'}}><Link to='/series'> Series </Link></li>
        <li style={{float: 'right'}}><Link to='/movies'> Movies </Link></li>

      </ul>
    </div>
  );
}

export default Nav;
