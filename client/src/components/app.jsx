import React from 'react';
import ReactDOM from 'react-dom';
import Address from './address.jsx';
import HouseStats from './houseStats.jsx';
import Description from './description.jsx';
import Price from './price.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      house: {
        street: '2091 Califronia St.',
        city: 'Berkeley', state: 'CA', zipcode: '94703',
        description: "Est nostrum rerum voluptatem quas voluptas sunt est qui error. Repellat sed consequatur harum eligendi. Dolor accusamus facilis corrupti illo.\n \rNam repellat dolorem et rem delectus vel ut. Alias suscipit cumque asperiores itaque voluptas et fuga. Blanditiis earum assumenda atque cupiditate veritatis. At minus corrupti."
      }
    }
  }

  render() {
    return (
      <div id='houseSummary'>
        <div id='houseDescription'>
          <Address house={this.state.house} />
          <HouseStats />
          <Description house={this.state.house} />
        </div>
        <div id='housePrice'>
          <Price />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))