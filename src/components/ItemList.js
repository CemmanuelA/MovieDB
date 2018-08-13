import React from 'react';
import ModalVideo from 'react-modal-video';

class ItemList extends React.Component {

  constructor (props) {
     super(props)
     this.state = {
       isOpen: false
     }
     this.openModal = this.openModal.bind(this)
   }

  openModal () {
    this.setState({isOpen: true})
  }

  render(){

    const { title, raiting, duration, seasonsOrDate,
      episodiesOrGenre, overview, posterSrc, source, addToFav, videoId} = this.props;

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
            <p>{overview}</p>
            <div className="buttonContainer">
              <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={videoId} onClose={() => this.setState({isOpen: false})} />
              <button className="btnTrailer" onClick={() => this.openModal()}>Watch trailer</button>
              {(source !== 'favorites') ?
              <div className="favorite" onClick={ addToFav }>
                <p>Add to favorites</p>
                <img alt="heart" src="assets/favorite.png"/>
              </div>
              :
              <div></div>  }
            </div>
          </div>
      </div>
    );


  }
}

  export default ItemList;
