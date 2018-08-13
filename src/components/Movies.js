import React from 'react';

import Filter from './Filter';
import ItemList from './ItemList';


const endpoint = "/discover/movie"

class Movies extends React.Component {


constructor(props){
  super(props);
  this.state = {
    year:'2018',
    genre:'28',
    movieList: []
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
    .then((movies) => {
      movies.results.forEach((item ) => {
        const urlItem = urlBase + "/movie/" + item.id + "?api_key=" + apikey + "&append_to_response=videos";
        promises.push(fetch(urlItem).then(res => res.json()));
      })
      Promise.all(promises).then(all => {
        all.forEach(result => {
          const findGenre = (result.genres != undefined) ? result.genres.find( g => g.id == genre) : undefined;
          result.genre = (findGenre !== undefined ) ? findGenre.name : 'no genre' ;
          result.posterSrc = "http://image.tmdb.org/t/p/w154" + result.poster_path;

          const itemRow = result
          itemRows.push(itemRow)
        });
        this.setState({movieList: itemRows});
      });

    })
  }

  addToFavorites( pos ){
    const movie = this.state.movieList[pos];
    movie.source = 'movies'
    var favorites = localStorage.getItem('favorites');
    if(!favorites)
      favorites = "[]";
    const parsedFavs = JSON.parse(favorites);
    const favsArray = [...parsedFavs, movie];
    localStorage.setItem('favorites',JSON.stringify(favsArray));

  }

  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState){

    if(this.state.year != prevState.year || this.state.genre != prevState.genre){
      this.fetchData();
    };
  }

  render(){
    //const { genre, year } = this.state;
    const { urlBase, apikey } = this.props;
    return(
      <div>
        <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                apikey={apikey} source="movies" />
        <div className="list">
          {this.state.movieList.map((result, i) =>{
            return (<ItemList key={result.id} title={result.title} raiting={result.vote_average}
                              duration={result.runtime} seasonsOrDate={result.release_date}
                              episodiesOrGenre={result.genre} overview={result.overview}
                              posterSrc={result.posterSrc} source="movies"
                              addToFav={() => { this.addToFavorites(i)}}
                              videoId={(result.videos.results.length > 0) ? result.videos.results[0].key : 'L61p2uyiMSo'}
                            />);
          })}
        </div>
      </div>
    )
  }
}

export default Movies;
