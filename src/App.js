import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Search from './components/Search';
import Movies from './components/Movies';
import Series from './components/Series';
import Favorites from './components/Favorites';

const apiKey = "a3d4120ff3a44697a45534cc8f042761";
const urlBase = "https://api.themoviedb.org/3";
var query = "";

const movieComponent = (props) =>{
  return(
    <Movies
    {...props}
    urlBase={urlBase}
    apikey={apiKey}
    query={query}
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

const favoriteComponent = (props) =>{
  return(
    <Favorites
    {...props}
    />
  )
}
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
    }

    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(Q){
      this.setState({query});
      query = query + Q;
  }


  render() {
    return (
      <Router>
        <div>
            <Nav />
            <Search handleQuery={this.handleQuery}/>
            <p style= {{paddingLeft: 10}}> Discover new movies and tv shows </p>
            <Switch>
              <Redirect exact from='/' to='/movies' />
              <Route path='/movies' render={movieComponent}/>
              <Route path='/series' render={serieComponent} />
              <Route path='/favorites' render={favoriteComponent} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
