import React from 'react';
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
      const urlString = urlBase + endpoint + "?api_key=" + apikey+ "&first_air_date_year=" + year +"&with_genres="+genre;
      const itemRows = [];
      const promises = [];

      fetch(urlString)
      .then(res => res.json() )
      .then((series) => {
        series.results.forEach((item ) => {
          const urlItem = urlBase + "/tv/" + item.id + "?api_key=" + apikey + "&append_to_response=videos";
          promises.push(fetch(urlItem).then(res => res.json()));
        })
        Promise.all(promises).then(all => {
          all.forEach(result => {
            const findGenre = (result.genres != undefined) ? result.genres.find( g => g.id == genre) : undefined;
            result.genre = (findGenre  !== undefined) ? findGenre.name : 'no gender';
            result.posterSrc = "http://image.tmdb.org/t/p/w154" + result.poster_path;

            const itemRow = result
            itemRows.push(itemRow)
          });
          this.setState({serieList: itemRows});
        });

      })
  }

  addToFavorites( pos ){
    //Get object with the serie information
    const serie = this.state.serieList[pos];
    // Add the source of the favorite item
    serie.source = 'series'
    //get fav array from local storage
    var favorites = localStorage.getItem('favorites');
    if(!favorites)
      favorites = "[]";
    // Parse favorite from string to array
    const parsedFavs = JSON.parse(favorites);
    //Find if the serie exitsa
    if(!parsedFavs.find(elem => {
      return elem.id === serie.id
    })) {
      //Add the serie to the array
      const favsArray = [...parsedFavs, serie];
     //transform the array to string and add to local storage
      localStorage.setItem('favorites',JSON.stringify(favsArray));
  }

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
    const { urlBase, apikey } = this.props;
    if(this.state.serieList.length > 0){
      return(
        <div>
          <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                  apikey={apikey} source="movies" />
          <div className="list">
            {this.state.serieList.map((result, i) =>{
              return (<ItemList key={result.id} title={result.name || 'undefined'} raiting={result.vote_average || 'undefined'}
                                duration={result.episode_run_time[0]  || 'undefined'} seasonsOrDate={result.number_of_seasons || 'undefined'}
                                episodiesOrGenre={result.number_of_episodes || 'undefined'} overview={result.overview || 'undefined'}
                                posterSrc={result.posterSrc} source="series"
                                sourceComponent='series'
                                addToFav={() => { this.addToFavorites(i)}}
                                videoId={(result.videos.results.length > 0) ? result.videos.results[0].key : 'L61p2uyiMSo'}
                              />);
            })}
          </div>
        </div>
      )
    }else{
      return(<div>
                <Filter handleYear={this.handleYear} handleSelectOption={this.handleSelectOption} urlBase={urlBase}
                  apikey={apikey} source="movies" />
                <div>Sorry no series were found related to these criterias</div>
            </div>);
    }
  }
}

export default Series;
