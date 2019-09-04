import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';

//display restaurant details 
class Restaurant extends React.Component {
  render() {
      const rest = this.props.resRestaurant;
      const desc = rest.FullDescription.replace(/<p>/gi,'\n');

      return(
          <div className="result" style={{backgroundImage:'url(' + rest.Pic_Url + ')'}}>
              <div className="rest-name">{rest.Name}</div>
              <div className="rest-city">{rest.City}</div>
              <div className="rest-desc">{desc.replace(new RegExp('</p>', 'g')," ")}</div>
          </div>
      );
  }
}
//display restaurants according to the search
class RestTable extends React.Component {
  render() {
      const rows = [];

      if (this.props.searchButton) {
        this.props.restaurants.forEach((element) => {
          if (element.Region === this.props.filterRegion 
            && element.City === this.props.filterCity
            && element.Restaurant_.split(';').indexOf(this.props.filterType) !== -1
            ){
            rows.push(<Restaurant resRestaurant = {element} />);
          }
        })
      }
      return (
      <div >
          <div className="results-wrapper">{rows}</div>
      </div>
      );
  }
}

class Dropdown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
                      showItems: false,
                      selectedItems: this.props.filterValue,
                      
      };

  }
  //get this as a input. and change the value of showItems
  dropdown = () => {
      this.setState(prevState => ({showItems: !prevState.showItems}))
  }

  selectItem(item) {
    this.setState( {selectedItems: item,showItems: false })
  }
  
  render() {
  
      const rows = [];
      //add values for the filters 
      this.props.list.forEach((element) => {
        if (this.props.filterValue === 'Region') {
          if (!rows.includes(element.Region))
            rows.push(element.Region)
        }          
        if (this.props.filterValue === 'Type') {
          var types = element.Restaurant_.split(';');
          types.forEach(type => {
            if (!rows.includes(type)) 
              rows.push(type)
          })
        }
        if (this.props.filterValue === 'City') {
          if (!rows.includes(element.City))
              rows.push(element.City);
      }
    })

      return (
        <div className = "dropdown" >
            <div className="dropdown-title" onClick = {this.dropdown}
            >  
              <span 
                  className={`${this.state.showItems ? 'dropdown-arrow-down' : 'dropdown-arrow-up'}`} 
              /> 
              <p className="dropdown-text">{this.state.selectedItems}</p>
            </div>
            <div
            className = "dropdown-filters"
            style={{display:this.state.showItems ? 'block' : 'none'}}
            > {
              rows.map(filterItem => <div onClick= {(e)=> { this.selectItem(filterItem) ;this.props.onFilterChange(filterItem);}}
              className={`${this.state.selectedItems===filterItem ? 'selected' : '' }`}  >
                {filterItem}
              </div>
              )
            }
            </div>
          </div>
      );
  }
}

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
        if (rest.Region === region)
          return true;
        else
          return false;
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: [],
      isLoaded: false
    };
  }
  
  componentDidMount() {
	 fetch("https://data.gov.il/api/action/datastore_search?resource_id=37a22e99-1deb-43a5-8751-5bbffa70a770")
    .then(data => data.json())
	.then(json => json.result)
    .then(res => {this.setState({restaurantList: res.records,isLoaded:true})});
	
  }
 
  render() {
    
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }
    else {
      return (
        <div>
        <div className="main-page">
          <MainPage restaurants={this.state.restaurantList}  />
        </div>
        </div>
      );
    }

  }
}

export default App;
