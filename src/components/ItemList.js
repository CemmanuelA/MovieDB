import React from 'react';


class ItemList extends React.Component {
  render(){

    const { title, raiting, duration, seasonsOrDate, episodiesOrGenre, overview } = this.props;
    
    return(
      <div className="itemList">
          <div className="imgContainer">
            <img src="https://hipertextual.com/files/2018/05/marvel-avengers-infinity-war-poster-oficial-cover.jpg" />

          </div>
          <div className="detailsContainer">
            <div className="title">
              <p>{title}}</p>
              <p>{raiting}}</p>
            </div>
            <div className="importantDetails">
                <p>{duration +" m"}}</p>
                <p>{seasonsOrDate}</p>
                <p>{episodiesOrGenre}</p>
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
