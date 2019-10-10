import React from 'react';
import Restaurant from './Restaurant';

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

  export default RestTable;