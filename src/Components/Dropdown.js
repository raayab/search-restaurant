import React from 'react';

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
        const filterValue = this.props.filterValue;
        //add values for the filters 
        this.props.list.forEach((element) => {
          if (filterValue === 'Region') {
            if (!rows.includes(element.Region))
              rows.push(element.Region)
          }          
          if (filterValue === 'Type') {
            var types = element.Restaurant_.split(';');
            types.forEach(type => {
              if (!rows.includes(type)) 
                rows.push(type)
            })
          }
          if (filterValue === 'City') {
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

  export default Dropdown;
