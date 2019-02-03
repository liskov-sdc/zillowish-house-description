import React from 'react';

function Address(props) {
  return(
    <div>
      <div id='street'>{props.house.street}</div>
      <div id='cityStateZip'>{props.house.city}, {props.house.state} {props.house.state}</div>
    </div>
  )
}

export default Address;
