import React from 'react';
import Dropdown from './Dropdown';

class SearchBar extends React.Component {

  render() {
    return (
        <div className="search-Bar-main">
          <div className="search-Bar"> 
            <Dropdown className="filter" 
                      list={this.props.restaurants} 
                      filterValue = {'Region'}
                      onFilterChange = {this.props.handleFilterRegion} 
                        />
            <Dropdown className="filter" 
                      list={this.props.citiesFilteredByRegion} 
                      filterValue = {'City'}
                      onFilterChange = {this.props.handleFilterCity} 
                        />
            <Dropdown className="filter" 
                      list={this.props.restaurants} 
                      filterValue = {'Type'}
                      onFilterChange = {this.props.handleFilterType} 
                        />
            <div>
              <button className="search-button" type="button" onClick={this.props.handleSearchButton}>Search</button>  
            </div>
        </div>

      </div>
    );
  }
}

export default SearchBar;