import React from 'react';
import Select from 'react-select';
import $ from 'jquery';
const options  = [
  {value:'Action', label:'Action'},
  {value:'Adventure', label:'Adventure'},
  {value:'Animation', label:'Animation'},
  {value:'Comedy', label:'Comedy'},
  {value:'Documentary', label:'Documentaries'},
]

const endpointMovies = "/genre/movie/list";
const endpointSeries = "/genre/tv/list";

class Filter extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      selectedOption: options[0],
      year:''
    }

    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }


  handleSelectedChange(selectedOption) {
    this.setState({selectedOption});
    const { source, url, apikey } = this.props;
    const endPoint = (source == "movies") ? endpointMovies : endpointSeries;
    const urlString = url + endPoint +"?api_key=" + apikey;
    $.ajax({
      url:urlString,
      success: (result) =>{
        result.genres.forEach((gender) =>{
          if(gender.name.indexOf(selectedOption.value) > -1){
            this.props.handleSelectOption(gender.id);
          }

        });
      },
      error: (xhr,status,err) => {
        console.error('Something was wrong fetching the genders' + err)
      }
    });
  }
  handleYearChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]:value});
    this.props.handleYear(value);
  }
  render(){

      return(
        <div className="filter">
          <div>
            <p>Año</p>
            <input type="text"
              value={this.state.year}
              name="year"
              onChange={(y)=>this.handleYearChange(y)}
              />
          </div>
          <div>
            <p>Género</p>
            <Select
              value={this.state.selectedOption}
              onChange={(option)=>this.handleSelectedChange(option)}
              options={options}
              name="selectedOption"
               />
          </div>
        </div>
      );
  }

}

export default Filter;