import React from 'react';


class ItemList extends React.Component {
  render(){

    const { title, raiting, duration, seasonsOrDate, episodiesOrGenre, overview, posterSrc, source } = this.props;

    return(
      <div className="itemList">
          <div className="imgContainer">
            <img src={posterSrc} />

          </div>
          <div className="detailsContainer">
            <div className="title">
              <p>{title}</p>
              <p>{raiting}</p>
            </div>
            <div className="importantDetails">
                <p>{(duration != null ? duration +" m" : "undefined") }</p>
                <p>{(source == 'movies') ? seasonsOrDate : seasonsOrDate + ' seasons' }</p>
                <p>{(source == 'movies' ) ? episodiesOrGenre : episodiesOrGenre + ' episodies' }</p>
            </div>
            <p>{overview}}</p>
            <div className="buttonContainer">
              <button className="btnTrailer">Watch trailer</button>
              <div className="favorite">
                <p>Add to favorites</p>
                <img alt="heart" src="assets/favorite.png"/>
              </div>
            </div>
          </div>
      </div>
    );


  }
}

  export default ItemList;
