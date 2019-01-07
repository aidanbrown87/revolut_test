import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Currency from "../currency/Currency";
import {
  updateBase,
  updateBaseQuantity,
  updateTerm,
  updateTermQuantity
} from "../../reducers/currencies";
import SwapCurrenciesButton from "../swapcurrenciesbutton/SwapCurrenciesButton";
import Rate from "../rate/Rate";
import { fetchRates } from "../../reducers/rates";
import ExchangeButton from "../exchangeButton/ExchangeButton";
import { exchangeMoney } from "../../reducers/pots";

class WidgetContainer extends Component {
  componentDidMount() {
    this.startRatesRequest();
  }

  componentWillReceiveProps(newProps) {
    const { base } = this.props;
    const { base: newBase } = newProps;

    if (base !== newBase) {
      clearInterval(this.fetchInterval);
      this.startRatesRequest();
    }
  }

  startRatesRequest() {
    const { fetchRates } = this.props;
    this.props.fetchRates();
    this.fetchInterval = setInterval(fetchRates, 10000);
  }

  getQuantityFromRate(rate, quantity, isBase) {
    if (!rate) return undefined;

    return isBase ? quantity / rate : quantity * rate;
  }

  validateQuantity(quantity, rate, isBase, otherSideQuantity) {
    if (!quantity && !otherSideQuantity) return undefined;

    const validatedQuantity = isNaN(quantity)
      ? this.getQuantityFromRate(rate, otherSideQuantity, isBase)
      : quantity;

    return Math.floor(validatedQuantity * 100) / 100;
  }

  onExchange(base, term, baseQuantity, termQuantity) {
    const { exchange } = this.props;
    return () => {
      exchange(base, term, baseQuantity, termQuantity);
    };
  }

  render() {
    const {
      base,
      term,
      baseQuantity,
      termQuantity,
      baseBalance,
      termBalance,
      onChangeBaseCurrency,
      onChangeTermCurrency,
      onChangeBaseQuantity,
      onChangeTermQuantity,
      rate
    } = this.props;

    const validatedBaseQuantity = this.validateQuantity(
      baseQuantity,
      rate,
      true,
      termQuantity
    );
    const validatedTermQuantity = this.validateQuantity(
      termQuantity,
      rate,
      false,
      baseQuantity
    );

    const baseQuantityBelowBalance = validatedBaseQuantity <= baseBalance;
    const isBaseQuantitySet = validatedBaseQuantity > 0;
    const isValidExchange = isBaseQuantitySet && baseQuantityBelowBalance;

    return (
      <>
        <Currency
          base={base}
          term={term}
          quantity={validatedBaseQuantity}
          updateCurrency={onChangeBaseCurrency}
          updateQuantity={onChangeBaseQuantity}
          balance={baseBalance}
          isBase
        />
        <SwapCurrenciesButton />
        <Rate rate={rate} base={base} term={term} />
        <Currency
          base={base}
          term={term}
          quantity={validatedTermQuantity}
          updateCurrency={onChangeTermCurrency}
          updateQuantity={onChangeTermQuantity}
          balance={termBalance}
        />
        <ExchangeButton
          onClick={this.onExchange(
            base,
            term,
            validatedBaseQuantity,
            validatedTermQuantity
          )}
          disabled={!isValidExchange}
        />
        <span className="background" />
      </>
    );
  }
}

WidgetContainer.propTypes = {
  base: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  baseQuantity: PropTypes.number,
  termQuantity: PropTypes.number,
  baseBalance: PropTypes.number.isRequired,
  termBalance: PropTypes.number.isRequired,
  rate: PropTypes.number
};

const mapStateToProps = ({
  currencies: { base, term, baseQuantity, termQuantity },
  rates,
  pots
}) => ({
  base,
  term,
  baseQuantity,
  termQuantity,
  baseBalance: pots[base] / 100,
  termBalance: pots[term] / 100,
  rate: rates[base] && rates[base][term]
});

const mapDispatchToProps = dispatch => ({
  onChangeBaseCurrency: event => {
    dispatch(updateBase(event.target.value));
  },
  onChangeTermCurrency: event => {
    dispatch(updateTerm(event.target.value));
  },
  onChangeBaseQuantity: quantity => {
    dispatch(updateBaseQuantity(parseFloat(quantity)));
  },
  onChangeTermQuantity: quantity => {
    dispatch(updateTermQuantity(parseFloat(quantity)));
  },
  fetchRates: () => {
    dispatch(fetchRates());
  },
  exchange: (base, term, baseQuantity, termQuantity) => {
    dispatch(exchangeMoney({ base, term, baseQuantity, termQuantity }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetContainer);
