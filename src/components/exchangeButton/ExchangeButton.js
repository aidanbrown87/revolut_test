import React from 'react';
import PropTypes from 'prop-types';

import './exchangeButton.css'

const ExchangeButton = ({ onClick, disabled }) => {
  return (
    <button className='exchange' onClick={onClick} disabled={disabled}>
      Exchange
    </button>
  );
};

ExchangeButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExchangeButton;