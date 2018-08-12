import React from 'react';

import Filter from './Filter';
import List from './List';


const endpoint = "/discover/movie"

class Movies extends React.Component {


constructor(props){
  super(props);
  this.state = {
    year:'2018',
    genre:'28'
  }
  this.handleYear = this.handleYear.bind(this);
  this.handleSelectOption = this.handleSelectOption.bind(this);
}
  handleYear(year){
    this.setState({year:year});

  }
  handleSelectOption(genre) {
    this.setState({genre});
  }

  render(){
    const { genre, year } = this.state;
    const { urlBase, apikey } = this.props;
    return(
      <div>
        <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                apikey={apikey} source="movies" />
        <List year={year} genre={genre} urlBase={urlBase} apikey={apikey} endpoint={endpoint} endpointItem="/movie/" />
      </div>
    )
  }
}

export default Movies;
