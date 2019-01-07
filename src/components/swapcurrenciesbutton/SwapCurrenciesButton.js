import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import swapIcon from '../../assets/switch-vertical-orientation-arrows.png'
import { swapCurrencies } from '../../reducers/currencies';
import './swap.css'

const SwapCurrenciesButton = ({ swap }) => {
  return (
    <div className="swap">
      <img src={swapIcon} alt="switch currencies" onClick={swap}/>
    </div>
  );
};

SwapCurrenciesButton.propTypes = {
  swap: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  swap: () => dispatch(swapCurrencies())
})

export default connect(undefined, mapDispatchToProps)(SwapCurrenciesButton);