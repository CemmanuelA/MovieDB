import React from 'react';

import Filter from './Filter';
import ItemList from './ItemList';


class Favorites extends React.Component {


constructor(props){
  super(props);
  this.state = {
    year:'2018',
    genre:'Action',
    favoriteList: [],
    filterList: []
  }
  this.handleYear = this.handleYear.bind(this);
  this.handleSelectOption = this.handleSelectOption.bind(this);
  this.handleSearch = this.handleSearch.bind(this);
  this.handleFilter = this.handleFilter.bind(this);
}
  handleYear(year){
    this.setState({year:year});

  }
  handleSelectOption(genre) {
    this.setState({genre});
  }

  handleSearch() {
    const { favoriteList } = this.state;
    const { query } = this.props;
    const newFilterList = [];
    favoriteList.forEach( (fav) =>{
      console.log(fav,'fav');
      if(query === ''){
        const favItem = this.handleFilter(fav);
        if(favItem !== undefined){
          if(Object.keys(favItem).length > 0)
            newFilterList.push(favItem);
        }
      }else{
        if(fav.source === 'movies'){
          if(fav.title.toLowerCase().search(query.toLowerCase()) > -1
              || fav.overview.toLowerCase().search(query.toLowerCase()) > -1){
            const favItem = this.handleFilter(fav);
            console.log(favItem,'favItem');
            if(favItem !== undefined){
              if(Object.keys(favItem).length > 0)
                newFilterList.push(favItem);
            }
          }
        }else {
          if(fav.source === 'series'){
            if(fav.name.toLowerCase().search(query.toLocaleLowerCase()) > -1
                || fav.overview.toLowerCase().search(query.toLowerCase()) > -1){
              const favItem = this.handleFilter(fav);
              console.log(favItem,'favItem');
              if(favItem !== undefined){
                if(Object.keys(favItem).length > 0)
                  newFilterList.push(favItem);
              }

            }
          }
        }
      }

    });
    this.setState({filterList: newFilterList});
  }

  handleFilter(fav){
    const {year, genre} = this.state;
    const empty = {};
    if(year === ''){
      if(fav.genre.indexOf(genre) > -1) {
        return  fav;
      }
    }else{
        if(fav.source === 'movies'){
          if(fav.release_date.indexOf(year) > -1 && fav.genre.indexOf(genre) > -1){
              return  fav;
            }
        }else{
          if(fav.source === 'series'){
            if(fav.first_air_date.indexOf(year) > -1 && fav.genre.indexOf(genre) > -1){
              return  fav;
            }
          }
        }
    }
  }




  componentDidMount() {
    var favorites = localStorage.getItem('favorites');
    if(!favorites)
      favorites = "[]";
    const parsedFavs = JSON.parse(favorites);
    this.setState({favoriteList: parsedFavs ,
                   filterList: parsedFavs});
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.year != prevState.year || this.state.genre != prevState.genre
      || this.props.query != prevProps.query){

      this.handleSearch();
    };

  }


  render(){
    if(this.state.filterList.length > 0) {
      return(
        <div>
          <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption}
                  source="favorites" />
          <div className="list">
            {this.state.filterList.map((result) =>{
              return (<ItemList key={result.id} title={(result.source === 'series') ? result.name : result.title}
                        raiting={result.vote_average}
                        duration={(result.source === 'movies') ? result.runtime : result.episode_run_time[0]}
                        seasonsOrDate={(result.source === 'movies') ? result.release_date : result.number_of_seasons}
                        episodiesOrGenre={(result.source === 'movies') ? result.genre : result.number_of_episodes}
                        overview={result.overview}
                        posterSrc={result.posterSrc} source={result.source}
                        sourceComponent='favorites'
                        videoId={(result.videos.results.length > 0) ? result.videos.results[0].key : 'L61p2uyiMSo'}
                      />);
            })}
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption}
                  source="favorites" />
          <div className="List">
            Sorry no items were found related to these criterias
          </div>
        </div>)
    }
  }
}

/*


*/

export default Favorites;
