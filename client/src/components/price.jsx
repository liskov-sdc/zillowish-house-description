import React from 'react';

function Price() {
  return (
    <div>
      <div>
        <div id='forSale'>
          <span>
            <svg height="10" width="10" viewBox="0 0 19 19">
              <circle cx="5" cy="5" r="5" fill="#ff3544" />
            </svg>
          </span>
          for sale
        </div>
        <div id='price'>$899,000</div>
        <div id='zest'>Zestimate: $972,230</div>
      </div>
      <div>
        <div id='estMort'>est. mortgage</div>
        <div id='autoEst'>$3,523/mo</div>
        <div>
          <button id='preQual'>
            <span>
              <svg height="19" width="19" viewBox="0 0 19 19">
                <circle cx="9.5" cy="9.5" r="9.5" fill="#0074e4" />
                <text fontSize="13" fontWeight="400" fill="#FFF">
                  <tspan x="5.327" y="14">$</tspan>
                </text>
              </svg>
            </span>
            Get pre-qualified
          </button>
        </div>
      </div>
    </div>
  )

}

export default Price;