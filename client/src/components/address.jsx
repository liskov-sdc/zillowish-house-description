import React from 'react';
import AddressStyle from './styledComponents/address.style.js';

function Address(props) {
  return(
    <div id='address'>
      <AddressStyle.Street>{props.house.street}</AddressStyle.Street>
      <AddressStyle.CityStateZip>{props.house.city}, {props.house.state} {props.house.zipcode}</AddressStyle.CityStateZip>
    </div>
  )
}

export default Address;
