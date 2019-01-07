import React from "react";
import PropTypes from "prop-types";

import CurrencySelector from "../currencyselector/CurrencySelector";
import QuantityInput from "../quantityInput/QuantityInput";
import Balance from "../balance/Balance";
import "./currency.css";

const Currency = props => {
  const {
    updateCurrency,
    updateQuantity,
    base,
    term,
    quantity,
    balance,
    isBase,
  } = props;

  const overLimit = isBase && quantity > balance

  return (
    <div className={`currency ${isBase ? "base" : "term"}`}>
      <CurrencySelector
        selectedCurrency={isBase ? base : term}
        onChange={updateCurrency}
      />
      <QuantityInput
        quantity={quantity || (!isBase ? 0 : undefined)}
        onChange={updateQuantity}
        prefix={isBase ? "-" : "+"}
      />
      <Balance
        currency={isBase ? base : term}
        balance={balance}
        overLimit={overLimit}
      />
    </div>
  );
};

Currency.propTypes = {
  updateCurrency: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  base: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  balance: PropTypes.number.isRequired,
  isBase: PropTypes.bool,
};

export default Currency;
