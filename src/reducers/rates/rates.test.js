import ratesReducer, { addRates } from "./index";

const standardOpenExchangeRatesResponse = {
  disclaimer: "https://openexchangerates.org/terms/",
  license: "https://openexchangerates.org/license/",
  timestamp: 1449877801,
  base: "USD",
  rates: {
    EUR: 1.2345,
    GBP: 2.3456
  }
};

describe("Rates reducer", () => {
  it("should initialise with no rates", () => {
    const state = ratesReducer(undefined, {});
    expect(state).toEqual({});
  });

  it("should add rates to the state", () => {
    const state = ratesReducer({}, addRates(standardOpenExchangeRatesResponse));
    expect(state).toEqual({
      USD: {
        EUR: 1.2345,
        GBP: 2.3456
      }
    });
  });

  it("should replace the previous rates for a base currency with updated ones", () => {
    const rates = {
      EUR: 1.1111,
      GBP: 2.2222
    };
    const ratesResponse = {
      ...standardOpenExchangeRatesResponse,
      rates
    };
    const state = ratesReducer(
      {
        USD: {
          EUR: 1.2345,
          GBP: 2.3456
        }
      },
      addRates(ratesResponse)
    );

    expect(state).toEqual({
      USD: rates
    });
  });

  it("should replace existing rates with rates for a new currency", () => {
    const rates = {
      EUR: 3.3333,
      USD: 4.4444
    };
    const ratesResponse = {
      ...standardOpenExchangeRatesResponse,
      base: "GBP",
      rates
    };

    const state = ratesReducer(
      {
        USD: {
          EUR: 1.2345,
          GBP: 2.3456
        }
      },
      addRates(ratesResponse)
    );

    expect(state).toEqual({
      GBP: rates
    });
  });
});
