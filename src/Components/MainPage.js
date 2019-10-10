import React from 'react';
import RestTable from './RestTable';
import SearchBar from './SearchBar';

class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchButton: false,
        citiesFilteredByRegion: []
      };
      this.filterRegion = 'Region';
      this.filterCity = 'City';
      this.filterType = 'Type';
      
      this.handleFilterRegion = this.handleFilterRegion.bind(this);
      this.handleFilterCity = this.handleFilterCity.bind(this);
      this.handleFilterType = this.handleFilterType.bind(this);
      this.handleSearchButton = this.handleSearchButton.bind(this);
    }
    
  
    handleFilterRegion(region) {
      this.setState({
        citiesFilteredByRegion: this.props.restaurants.filter(rest=> {
          return rest.Region === region
        })
      });
      this.filterRegion=region;
    }
    handleFilterCity(city) {
      this.filterCity=city;
    }
    handleFilterType(type) {
      this.filterType=type;
    }
    handleSearchButton = ()=>{this.setState({searchButton: true})}
    
    render() {
      
  
      return (
        <div>
           <SearchBar 
            restaurants= {this.props.restaurants}
            handleFilterRegion = {this.handleFilterRegion}
            handleFilterCity = {this.handleFilterCity}
            handleFilterType = {this.handleFilterType}
            searchButton = {this.state.searchButton}
            handleSearchButton = {this.handleSearchButton}
            citiesFilteredByRegion = {this.state.citiesFilteredByRegion}
            /> 
          <RestTable 
            restaurants={this.props.restaurants} 
            searchButton = {this.state.searchButton}
            filterRegion = {this.filterRegion}
            filterCity = {this.filterCity}
            filterType = {this.filterType}
            
             />
        </div>
      );
    }
  }

  export default MainPage;