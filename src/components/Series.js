import React from 'react';
import $ from 'jquery';

import Filter from './Filter';
import ItemList from './ItemList';


const endpoint = "/discover/tv"

class Series extends React.Component {


constructor(props){
  super(props);
  this.state = {
    year:'2018',
    genre:'10759',
    serieList: []
  }
  this.handleYear = this.handleYear.bind(this);
  this.handleSelectOption = this.handleSelectOption.bind(this);
  this.fetchData = this.fetchData.bind(this);
  this.addTofavorites = this.addToFavorites.bind(this);
}
  handleYear(year){
    this.setState({year:year});

  }
  handleSelectOption(genre) {
    this.setState({genre});
  }


    fetchData(){

      const { urlBase, apikey } = this.props;
      const { year, genre } = this.state;
      const urlString = urlBase + endpoint + "?api_key=" + apikey+ "&primary_release_year=" + year +"&with_genres="+genre;
      const itemRows = [];
      const promises = [];
  
      fetch(urlString)
      .then(res => res.json() )
      .then((series) => {
        series.results.forEach((item ) => {
          const urlItem = urlBase + "/tv/" + item.id + "?api_key=" + apikey;
          promises.push(fetch(urlItem).then(res => res.json()));
        })
        Promise.all(promises).then(all => {
          all.forEach(result => {
            /* const findGenre = result.genres.find( g => g.id == genre);
            result.genre = (findGenre  !== undefined) ? findGenre.name : 'no gender'; */
            result.posterSrc = "http://image.tmdb.org/t/p/w154" + result.poster_path;
  
            const itemRow = result
            itemRows.push(itemRow)
          });
          this.setState({serieList: itemRows});
        });
  
      })
  }

  addToFavorites( pos ){
    const serie = this.state.movieList[pos];
    serie.source = 'series'
    var favorites = localStorage.getItem('favorites');
    localStorage.setItem('favorites',[...favorites, serie])
    
  }

  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState){

    if(this.state.year != prevState.year || this.state.genre != prevState.genre){
      console.log(this.state)
      this.fetchData();
    };
  }

  render(){
    //const { genre, year } = this.state;
    const { urlBase, apikey } = this.props;
    console.log(this.state.movieList, 'jkadsfjds')
    return(
      <div>
        <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                apikey={apikey} source="movies" />
        <div className="list">
          {this.state.serieList.map((result) =>{
            return (<ItemList key={result.id} title={result.name} raiting={result.vote_average}
                              duration={result.episode_run_time[0]} seasonsOrDate={result.number_of_seasons}
                              episodiesOrGenre={result.number_of_episodes} overview={result.overview}
                              posterSrc={result.posterSrc} source="series" />);
          })}
        </div>
      </div>
    )
  }
}

export default Series;
