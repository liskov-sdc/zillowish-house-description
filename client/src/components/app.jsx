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
      house: {}
    }
  }

  componentDidMount() {
    $.get(`/houses/${this.state.id}`, (data) => {
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
    $.get(`/houses/${this.state.id}`, (data) => {
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
            <HouseStats />
          </div>
          <div id='housePrice'>
            <Price />
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