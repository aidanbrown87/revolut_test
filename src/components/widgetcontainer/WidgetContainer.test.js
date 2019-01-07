import React from "react";
import { shallow } from "enzyme";
import WidgetContainer from "./WidgetContainer";
import Currency from "../currency/Currency";
import Rate from "../rate/Rate";
import SwapCurrenciesButton from "../swapcurrenciesbutton/SwapCurrenciesButton";
import ExchangeButton from "../exchangeButton/ExchangeButton";

describe("Widget Container", () => {
  describe('widget with props', () => {
    const props = {
      fetchRates: () => {},
      base: 'USD',
      term: 'EUR',
      baseQuantity: 100,
      termQuantity: undefined,
      baseBalance: 4500,
      termBalance: 600,
      onChangeBaseCurrency: () => {},
      onChangeTermCurrency: () => {},
      onChangeBaseQuantity: () => {},
      onChangeTermQuantity: () => {},
      rate: 2,
    };

    const widgetContainer = shallow(
      <WidgetContainer.WrappedComponent {...props} />
    );

    describe('Currency components', () => {
      const currencies = widgetContainer.find(Currency)

      it("should render two currency components", () => {
        expect(widgetContainer.find(Currency)).toHaveLength(2);
      });
      
      it('should render a base currency component', () => {
        const baseCurrency = currencies.at(0);
        expect(baseCurrency.prop("base")).toBe('USD')
        expect(baseCurrency.prop("term")).toBe('EUR')
        expect(baseCurrency.prop("quantity")).toBe(100)
        expect(baseCurrency.prop("updateCurrency")).toBe(props.onChangeBaseCurrency)
        expect(baseCurrency.prop("updateQuantity")).toBe(props.onChangeBaseQuantity)
        expect(baseCurrency.prop("balance")).toBe(4500)
        expect(baseCurrency.prop("isBase")).toBe(true)
      })
      
      it('should render a term currency component', () => {
        const termCurrency = currencies.at(1);
        expect(termCurrency.prop("base")).toBe('USD')
        expect(termCurrency.prop("term")).toBe('EUR')
        expect(termCurrency.prop("quantity")).toBe(200)
        expect(termCurrency.prop("updateCurrency")).toBe(props.onChangeTermCurrency)
        expect(termCurrency.prop("updateQuantity")).toBe(props.onChangeTermQuantity)
        expect(termCurrency.prop("balance")).toBe(600)
        expect(termCurrency.prop("isBase")).toBe(undefined)
      })
    })
    
    describe('swap currencies component', () => {
      const swapCurrencies = widgetContainer.find(SwapCurrenciesButton)
      it("should render a swap currencies component", () => {
        expect(swapCurrencies).toHaveLength(1);
      });
    })
    
    
    describe('rates component', () => {
      const rate = widgetContainer.find(Rate);
      it("should render a rate component", () => {
        expect(rate).toHaveLength(1);
      });

      it('should pass the correct props to the rate', () => {
        expect(rate.prop('rate')).toBe(props.rate)
        expect(rate.prop('base')).toBe(props.base)
        expect(rate.prop('term')).toBe(props.term)
      })
    })

    describe('exchange button', () => {
      const exchangeButton = widgetContainer.find(ExchangeButton);
      it("should render an exchange button component", () => {
        expect(exchangeButton).toHaveLength(1);
      });

      it('should pass the correct props to the exchange function', () => {
        expect(typeof exchangeButton.prop('onClick')).toBe('function')
        expect(exchangeButton.prop('disabled')).toBe(false)
      })
      
    })
    
    
  })
});
