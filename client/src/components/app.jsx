import React from 'react';
import ReactDOM from 'react-dom';
import Address from './address.jsx';
import HouseStats from './houseStats.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { house: { street: '2091 Califronia St.', city: 'Berkeley', state: 'CA', zipcode: '94703' } }
  }

  render() {
    return (
      <div id='houseSummary'>
        <div id='houseDescription'>
          <Address house={this.state.house} />
          <HouseStats />
        </div>
        <div id='housePrice'></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))