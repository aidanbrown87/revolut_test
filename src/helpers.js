export const currencies = {
  EUR: {
    name: 'EUR',
    symbol: '€',
  },
  GBP: {
    name: 'GBP',
    symbol: '£',
  },
  USD: {
    name: 'USD',
    symbol: '$',
  },
}

export const currenciesList = Object.values(currencies).map(currency => currency.name)

export const filteredCurrencyList = (currencyToFilter) => {
  return currenciesList.filter(currency => currency !== currencyToFilter)
}