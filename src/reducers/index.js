import { combineReducers } from 'redux';

import currencies from './currencies';
import rates from './rates';
import pots from './pots'

export default combineReducers({
  currencies,
  rates,
  pots,
})
