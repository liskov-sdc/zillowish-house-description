import React from 'react';
import ReactDOM from 'react-dom';
import Address from './address.jsx';
import HouseStats from './houseStats.jsx';
import Description from './description.jsx';
import Price from './price.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 99,
      house: {},
      beds: 4,
      baths: 3,
      sqft: 2789,
      price: 899000
    }
  }

  componentDidMount() {
    let id = window.location.pathname.split('/')[1]; //revise
    $.get(`http://localhost:3001/houses/${id}`, (data) => {
      let house = data[0];
      this.setState({
        house: {
          street: house.street,
          city: house.city,
          state: house.state,
          zipcode: house.zipcode,
          description: house.description
        }
      });
    })
  }

  componentDidUpdate() {
    let id = window.location.pathname.split('/')[1]; //revise
    $.get(`http://localhost:3001/houses/${id}`, (data) => {
      let house = data[0];
      this.setState({
        house: {
          street: house.street,
          city: house.city,
          state: house.state,
          zipcode: house.zipcode,
          description: house.description
        }
      });
    })
  }

  onIdChange(event) {
    this.setState({id: event.target.value});
  }

  render() {
    return (
      <div id='houseSummary'>
      <input onChange={this.onIdChange.bind(this)}></input>
        <div id='addressPrice'>
          <div id='addressStats'>
            <Address house={this.state.house} />
            <HouseStats beds={this.state.beds} baths={this.state.baths} sqft={this.state.sqft}/>
          </div>
          <div id='housePrice'>
            <Price price={this.state.price}/>
          </div>
        </div>
        <div id='houseDescription'>
          <Description house={this.state.house} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))