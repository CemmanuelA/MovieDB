import React from 'react';


const Nav = () => {

  return (
    <div className="navContainer">
      <ul className="nav">
        <li> <img className="logo" src="assets/logo.png" /> </li>
        <li>Movies</li>
        <li>Series</li>
        <li>Favorites</li>
      </ul>
    </div>
  );
}

export default Nav;
