import React from 'react';
import styled from 'styled-components';

const PriceStyle = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 1;
`;

const Zestimate = styled.div`
  font-size: 12px;
`;

const EstMortTitle = styled.div`
  font-size: 13px;
  line-height: 1.5;
  font-weight: 700;
  text-transform: uppercase;
`;

const EstMortgage = styled.div`
  display: inline-block;
  margin-right: 5px;
  min-width: 105px;
  font-size: 20px;
  font-size: 1.33333333rem;
  font-weight: 400;
`;

const PreQual = styled.button`
  cursor: pointer;
  font-weight: 300;
  text-decoration: none;
  border-color: #0074e4;
  color: #0074e4;
  border-radius: 5px;
  display: inline-block;
  padding: .4em .67em;
  text-align: center;
  white-space: normal;
  width: auto;
  line-height: 1.5;
`;

const ForSale = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1.5;
`;

function Price(props) {
  return (
    <div>
      <div>
        <ForSale>
          <span>
            <svg height="10" width="10" viewBox="0 0 19 19">
              <circle cx="5" cy="5" r="5" fill="#ff3544" />
            </svg>
          </span>
          for sale
        </ForSale>
        <PriceStyle>${props.price}</PriceStyle>
        <Zestimate>Zestimate: ${props.price * 1.2}</Zestimate>
      </div>
      <div>
        <EstMortTitle>est. mortgage</EstMortTitle>
        <EstMortgage>${Math.ceil(props.price / 260)}/mo</EstMortgage>
        <div>
          <PreQual>
            <span>
              <svg height="19" width="19" viewBox="0 0 19 19">
                <circle cx="9.5" cy="9.5" r="9.5" fill="#0074e4" />
                <text fontSize="13" fontWeight="400" fill="#FFF">
                  <tspan x="5.327" y="14">$</tspan>
                </text>
              </svg>
            </span>
            Get pre-qualified
          </PreQual>
        </div>
      </div>
    </div>
  )

}

export default Price;