
import React from 'react';

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

  export default Restaurant;