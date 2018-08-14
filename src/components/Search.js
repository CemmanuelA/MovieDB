import React from 'react';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
    }
  }

handleChange(event){
  const value = event.target.value;
  this.setState({query:value});
  this.props.handleQuery(value);
}
  render(){
    return(
      <div className="search">
        <img alt="search" src="assets/search.png"/>
        <input  value={this.state.query}
            placeholder="Search for a movie, series and videos"
            onChange={(e)=> this.handleChange(e)}
          />
      </div>
    );
  }
}

export default Search;
