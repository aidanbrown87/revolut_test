import { handleActions, createAction } from 'redux-actions';
import { filteredCurrencyList } from '../../helpers';

export const updateBase = createAction('UPDATE_BASE')
export const updateTerm = createAction('UPDATE_TERM')
export const swapCurrencies = createAction('SWAP_CURRENCIES')
export const updateBaseQuantity = createAction('UPDATE_BASE_QUANTITY')
export const updateTermQuantity = createAction('UPDATE_TERM_QUANTITY')

const initialState = {
  base: 'GBP',
  term: 'USD',
  baseQuantity: undefined,
  termQuantity: undefined,
}

const updateBaseReducer = (state, { payload: newBase }) => {
  return {
    ...state,
    base: newBase,
    term: newBase === state.term ? filteredCurrencyList(newBase)[0] : state.term
  }
}

const updateTermReducer = (state, { payload: newTerm }) => {
  return {
    ...state,
    term: newTerm,
    base: newTerm === state.base ? filteredCurrencyList(newTerm)[0] : state.base
  }
}

const swapCurrenciesReducer = (state) => {
  return {
    ...state,
    base: state.term,
    term: state.base,
  }
}

const updateBaseQuantityReducer = (state, action) => {
  return {
    ...state,
    baseQuantity: action.payload,
    termQuantity: undefined,
  }
}

const updateTermQuantityReducer = (state, action) => {
  return {
    ...state,
    baseQuantity: undefined,
    termQuantity: action.payload,
  }
}

export default handleActions({
  UPDATE_BASE: updateBaseReducer,
  'UPDATE_TERM': updateTermReducer,
  'SWAP_CURRENCIES': swapCurrenciesReducer,
  'UPDATE_BASE_QUANTITY': updateBaseQuantityReducer,
  'UPDATE_TERM_QUANTITY': updateTermQuantityReducer,
}, initialState)