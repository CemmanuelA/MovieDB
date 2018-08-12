import React from 'react';
import $ from 'jquery';

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
    var itemRows = []
    $.ajax({
      url:urlString,
      success: (searchResult) => {
        console.log(searchResult)
        searchResult.results.forEach((item) =>{
          const urlItem = urlBase + "/movie/" + item.id + "?api_key=" + apikey;
          $.ajax({
            url: urlItem,
            success: (result) =>{
              const findGenre = result.genres.find( g => g.id == genre);
              result.genre = findGenre.name;
              result.posterSrc = "http://image.tmdb.org/t/p/w154" + result.poster_path;

              const itemRow = result
              itemRows.push(itemRow);
            },
            error: (xhr, status,err) => {
              console.error('Something was wrong fetching the item id' + err);
            }
          });
        });
        this.setState({movieList: itemRows});
      },
      error: (xhr, status,err) => {
        console.error('Something was wrong fetching the items' + err);
      }
    });
  }

  shouldComponentUpdate(nextProps,nextState) {

  if (this.state.year !== nextState.year || this.state.genre !== nextState.genre) {
    this.fetchData();
    return true;
  }else{
    if(this.state.movieList !== nextState.movieList){
      return true;
    }
  }
  return false
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
          {this.state.movieList.map((result) =>{
            return (<ItemList key={result.id} title={result.title} raiting={result.vote_average}
                              duration={result.runtime} seasonsOrDate={result.release_date}
                              episodiesOrGenre={result.genre} overview={result.overview}
                              posterSrc={result.posterSrc} source="movies" />);
          })}
        </div>
      </div>
    )
  }
}

export default Movies;
