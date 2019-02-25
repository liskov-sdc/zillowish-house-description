import React from 'react';
import HouseStat from './styledComponents/houseStat.style.js';

function Dot() {
  return (
    <svg height="10" width="10">
      <rect x="3" y="3" width="3" height="3" fill="#000" />
    </svg>
  )
}

function HouseStats(props) {
  return (
    <div id="houseStats">
      <HouseStat>{props.beds} beds</HouseStat>
      <span><Dot/></span>
      <HouseStat>{props.bats} baths</HouseStat>
      <span><Dot/></span>
      <HouseStat>{props.sqft} sqft</HouseStat>
    </div>
  )
}

export default HouseStats;