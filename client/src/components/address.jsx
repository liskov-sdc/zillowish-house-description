import React from 'react';
import AddressStyle from './styledComponents/address.style.js';

function Address(props) {
  const { street, city, state, zipcode } = props.house;
  return (
    <div id='address'>
      <AddressStyle.Street>{street}</AddressStyle.Street>
      <AddressStyle.CityStateZip>{city}, {state} {zipcode}</AddressStyle.CityStateZip>
    </div>
  )
}

export default Address;
