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
  const { beds, baths, sqft } = props;
  return (
    <div id="houseStats">
      <HouseStat>{beds} beds</HouseStat>
      <span><Dot/></span>
      <HouseStat>{baths} baths</HouseStat>
      <span><Dot/></span>
      <HouseStat>{sqft} sqft</HouseStat>
    </div>
  )
}

export default HouseStats;