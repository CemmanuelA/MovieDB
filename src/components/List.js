import React from 'react';
import $ from 'jquery';

import Filter from './Filter';
import ItemList from './ItemList';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state  = {
      itemsList: []
    }
    this.fetchData = this.fetchData.bind(this);
  }

fetchData(){

  const { urlBase, endpoint, apikey, year, genre, endpointItem } = this.props;
  const urlString = urlBase + endpoint + "?api_key=" + apikey+ "&primary_release_year=" + year +"&with_genres="+genre;
  var itemRows = []
  $.ajax({
    url:urlString,
    success: (searchResult) => {
      console.log(searchResult)
      searchResult.results.forEach((item) =>{
        const urlItem = urlBase + endpointItem + item.id + "?api_key=" + apikey;
        $.ajax({
          url: urlItem,
          success: (result) =>{
            const findGenre = result.genres.find( g => g.id == genre);
            result.genre = findGenre.name;
            result.posterSrc = "http://image.tmdb.org/t/p/w185" + result.poster_path;

            const itemRow = result
            itemRows.push(itemRow);
          },
          error: (xhr, status,err) => {
            console.error('Something was wrong fetching the item id' + err);
          }
        });
      });
      this.setState({itemsList: itemRows});
    },
    error: (xhr, status,err) => {
      console.error('Something was wrong fetching the items' + err);
    }
  });
}
  render(){

    return(
      <div className="list">
        {this.state.itemsList.map((result) =>{
          return (<ItemList key={result.id} title={result.title} raiting={result.vote_average}
                            duration={result.runtime} seasonsOrDate={result.release_date}
                            episodiesOrGenre={result.genre} overview={result.overview}
                            posterSrc={result.posterSrc} />);
        })}
      </div>

    );
  }

}

export default List;
