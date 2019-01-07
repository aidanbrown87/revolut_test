import potsReducer, { exchangeMoney } from "./index";

describe("Pots reducer", () => {
  it("should exchange money with a base quantity", () => {
    const initialState = {
      EUR: 2000,
      GBP: 0,
    }
    const state = potsReducer(initialState, exchangeMoney({
      base: 'EUR',
      term: 'GBP',
      rate: 4,
      baseQuantity: 20,
      termQuantity: undefined,
    }));
    expect(state).toEqual({
      EUR: 0,
      GBP: 8000,
    });
  });

  it("should exchange money with a term quantity", () => {
    const initialState = {
      EUR: 2000,
      GBP: 0,
    }
    const state = potsReducer(initialState, exchangeMoney({
      base: 'EUR',
      term: 'GBP',
      rate: 4,
      baseQuantity: undefined,
      termQuantity: 80,
    }));
    expect(state).toEqual({
      EUR: 0,
      GBP: 8000,
    });
  });
});
