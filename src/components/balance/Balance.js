import React from 'react';
import PropTypes from 'prop-types';
import './balance.css'
import { currencies } from '../../helpers';

const Balance = ({ balance, currency, overLimit }) => (
  <div className='balance' style={{ color: overLimit ? 'red' : 'inherit'}}>
    {`Balance: ${currencies[currency].symbol}${balance}`}
  </div>
)

Balance.propTypes = {
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  overLimit: PropTypes.bool,
};

Balance.defaultProps = {
  overLimit: false,
}

export default Balance;