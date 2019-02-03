import React from 'react';

function Address(props) {
  return(
    <div id='address'>
      <div id='street'>{props.house.street}</div>
      <div id='cityStateZip'>{props.house.city}, {props.house.state} {props.house.zipcode}</div>
    </div>
  )
}

export default Address;
