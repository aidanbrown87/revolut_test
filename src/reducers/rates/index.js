import { handleActions, createAction } from "redux-actions";

import { currenciesList } from "../../helpers";

const app_id = "2b2991f4b09e4c778bed2e36beb5bfd3";
const URL = "https://openexchangerates.org/api/latest.json";

export const fetchRates = () => (dispatch, getState) => {
  const base = getState().currencies.base;

  const termsList = currenciesList
    .filter(currency => currency !== base)
    .join();

  fetch(`${URL}?app_id=${app_id}&base=${base}&symbols=${termsList}`)
    .then(response => response.json())
    .then(json => {
      dispatch(addRates(json));
    });
  // TODO Catch
};

export const addRates = createAction("ADD_RATES");

const addRatesReducer = (state, { payload: { base, rates } }) => ({
  [base]: rates,
});

export default handleActions(
  {
    ADD_RATES: addRatesReducer
  },
  {}
);
