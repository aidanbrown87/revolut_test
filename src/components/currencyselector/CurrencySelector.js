import React from 'react';
import PropTypes from 'prop-types';
import { currenciesList } from '../../helpers';
import './currency.css'

const CurrencySelector = props => {
  const { selectedCurrency, onChange } = props;
  return (
    <select className='currencySelector' onChange={onChange} value={selectedCurrency}>
      {currenciesList.map(currency => {
          return <option key={currency} value={currency}>{currency}</option>
        })
      }
    </select>
  );
};

CurrencySelector.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CurrencySelector;