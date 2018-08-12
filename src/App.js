import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Search from './components/Search';
import Movies from './components/Movies';
import Series from './components/Series';

const apiKey = "a3d4120ff3a44697a45534cc8f042761";
const urlBase = "https://api.themoviedb.org/3";
class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Search />
        <p style= {{paddingLeft: 10}}> Discover new movies and tv shows </p>

        <Movies urlBase={urlBase} apikey={apiKey}/>
        <Series urlBase={urlBase} apikey={apiKey}/>
      </div>
    );
  }
}

export default App;
