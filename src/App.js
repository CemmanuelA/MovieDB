import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Search from './components/Search';
import Movies from './components/Movies';
import Series from './components/Series';

const apiKey = "a3d4120ff3a44697a45534cc8f042761";
const urlBase = "https://api.themoviedb.org/3";

const movieComponent = (props) =>{
  return(
    <Movies
    {...props}
    urlBase={urlBase} 
    apikey={apiKey}
    />
  )
}
const serieComponent = (props) =>{
  return(
    <Series
    {...props}
    urlBase={urlBase} 
    apikey={apiKey}
    />
  )
}
class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <Nav />
          <Search />
          <p style= {{paddingLeft: 10}}> Discover new movies and tv shows </p>    
          <Switch>
            <Redirect exact from='/' to='/movies' />
            <Route path='/movies' render={movieComponent}/>
            <Route path='/series' render={serieComponent} />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
