import React from 'react';

import Filter from './Filter';
import ItemList from './ItemList';


const endpointSearch = "/search/movie"
const endpointDiscover = "/discover/movie"

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
    console.log('asdsd')
    const { urlBase, apikey, query } = this.props;
    const { year, genre } = this.state;
    const itemRows = [];
    const promises = [];
    let urlString;
    if(query != ''){
      urlString = urlBase + endpointSearch + "?api_key=" + apikey+ "&primary_release_year=" + year +"&query=" + query ;
    }else{
      urlString = urlBase + endpointDiscover + "?api_key=" + apikey+ "&primary_release_year=" + year +"&with_genres=" + genre ;
    };

    fetch(urlString)
    .then(res => res.json() )
    .then((movies) => {
      movies.results.forEach((item ) => {
        const urlItem = urlBase + "/movie/" + item.id + "?api_key=" + apikey + "&append_to_response=videos";
        promises.push(fetch(urlItem).then(res => res.json()));
      })
      if(promises.length > 0) {
        Promise.all(promises).then(all => {
          console.log(promises)
            all.forEach(result => {
              const findGenre = (result.genres != undefined) ? result.genres.find( g => g.id == genre) : undefined;
              if(findGenre !== undefined){
                result.genre =  findGenre.name;
                result.posterSrc = "http://image.tmdb.org/t/p/w154" + result.poster_path;
                const itemRow = result;
                itemRows.push(itemRow);
              }
            });
            this.setState({movieList: itemRows});
        })
      };
    })
    .catch(error => {
      console.log(`hubo un problema ${error}`);
    });
  }

  addToFavorites( pos ){
    const movie = this.state.movieList[pos];
    movie.source = 'movies';
    var favorites = localStorage.getItem('favorites');
    if(!favorites)
      favorites = "[]";

    const parsedFavs = JSON.parse(favorites);
    if(!parsedFavs.find(elem => {
      return elem.id === movie.id
    })) {
      const favsArray = [...parsedFavs, movie];
      localStorage.setItem('favorites',JSON.stringify(favsArray));
    }

  }

  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState){

    if(this.state.year != prevState.year || this.state.genre != prevState.genre
      || this.props.query != prevProps.query){
      this.fetchData();
    };
  }

  render(){
    const { urlBase, apikey } = this.props;
    if(this.state.movieList.length > 0) {
      return(
        <div>
          <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                  apikey={apikey} source="movies" />
          <div className="list">
            {this.state.movieList.map((result, i) =>{
              return (<ItemList key={result.id} title={result.title || 'undefined'} raiting={result.vote_average || 'undefined'}
                                duration={result.runtime || 'undefined'} seasonsOrDate={result.release_date || 'undefined'}
                                episodiesOrGenre={result.genre} overview={result.overview || 'undefined'}
                                posterSrc={result.posterSrc} source="movies"
                                sourceComponent='movies'
                                addToFav={() => { this.addToFavorites(i)}}
                                videoId={(result.videos.results.length > 0) ? result.videos.results[0].key : 'L61p2uyiMSo'}
                              />);
            })}
          </div>
        </div>
      );
    }else{
      return(<div>
              <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                      apikey={apikey} source="movies" />
              <div>Sorry no movies were found related to these criterias</div>
            </div>);
    }
  }
}

export default Movies;
