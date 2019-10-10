import React, { Component } from 'react';
import './styles.css';
import MainPage from './Components/MainPage'

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
