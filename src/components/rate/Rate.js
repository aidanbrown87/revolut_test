import React from 'react';
import PropTypes from 'prop-types';

import './rate.css'
import { currencies } from '../../helpers';
import rateIcon from '../../assets/profits.png';

const Rate = ({ rate, base, term }) => {
  return (
    <div className='rate'>
      <img className='rate_icon' src={rateIcon} alt="rate icon" />
      {rate && `${currencies[base].symbol}1 = ${currencies[term].symbol}${rate}`}
    </div>
  );
};

Rate.propTypes = {
  rate: PropTypes.number,
};

Rate.defaultProps = {
  rate: undefined,
}

export default Rate;