import React from 'react';
import ReactDOM from 'react-dom';
import Address from './address.jsx';
import HouseStats from './houseStats.jsx';
import HouseDescription from './houseDescription.jsx';
import Price from './price.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      house: {},
      beds: 4,
      baths: 3,
      sqft: 2789,
      price: 899000
    }
  }

  componentDidMount() {
    let id = window.location.pathname;
    (id === '/') ? id = 1 : id;
    $.get(`http://localhost:3001/houses${id}`, (data) => {
      let { street, city, state, zipcode, description } = data[0];
      this.setState({
        house: {
          street,
          city,
          state,
          zipcode,
          description
        }
      });
      $.get(`http://localhost:3001/prices${id}`, (data) => {
        const { price } = data[0];
        this.setState({ price });
      });
    });
  }

  render() {
    const { house, beds, baths, sqft, price } = this.state;

    return (
      <div id='houseSummary'>
        <div id='addressPrice'>
          <div id='addressStats'>
            <Address house={house} />
            <HouseStats beds={beds} baths={baths} sqft={sqft}/>
          </div>
          <div id='housePrice'>
            <Price price={price}/>
          </div>
        </div>
        <div id='houseDescription'>
          <HouseDescription house={house} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('description'))