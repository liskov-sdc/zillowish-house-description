import React from 'react';

function HouseStats() {
  return (
    <div id="houseStats">
      <div className='stat'>4 beds</div>
      <span>
        <svg height="10" width="10">
          <rect x="3" y="3" width="3" height="3" fill="#000" />
        </svg>
      </span>
      <div className='stat'>3 baths</div>
      <span>
        <svg height="10" width="10">
          <rect x="3" y="3" width="3" height="3" fill="#000" />
        </svg>
      </span>
      <div className='stat'>2,848 sqft</div>
    </div>
  )
}

export default HouseStats;