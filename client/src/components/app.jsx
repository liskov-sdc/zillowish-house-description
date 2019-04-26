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
    (id === '/') ? id = '/1' : id;
    const houseUrl = `http://ec2-18-218-189-239.us-east-2.compute.amazonaws.com:3000/houses${id}`
    let localUrl = `http://localhost:3001/houses${id}`;
    $.get(houseUrl, (data) => {
      let { street, city, state, zipcode, description } = data;
      this.setState({
        house: {
          street,
          city,
          state,
          zipcode,
          description
        }
      });
      const pricesUrl = `http://ec2-18-218-189-239.us-east-2.compute.amazonaws.com:3000/prices${id}`;
      let localPriceUrl = `http://localhost:3001/prices${id}`;
      $.get(pricesUrl, (data) => {
        const { price } = data;
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