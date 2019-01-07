import { handleActions, createAction } from "redux-actions";

const initialState = {
  EUR: 30000,
  USD: 15000,
  GBP: 100000
};

export const exchangeMoney = createAction("EXCHANGE");

const exchangeReducer = (
  state,
  { payload: { base, term, baseQuantity, termQuantity, rate } }
) => {
  const newBaseQuantity = baseQuantity
    ? state[base] - (baseQuantity * 100)
    : state[base] - ((termQuantity / rate) * 100);
  const newTermQuantity = termQuantity
    ? state[term] + (termQuantity * 100)
    : state[term] + ((baseQuantity * rate) * 100);
  return {
    ...state,
    [base]: newBaseQuantity,
    [term]: newTermQuantity
  };
};

export default handleActions(
  {
    EXCHANGE: exchangeReducer
  },
  initialState
);
