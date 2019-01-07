import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import './App.css';
import reducers from './reducers';
import WidgetContainer from './components/widgetcontainer/WidgetContainer';

//const store = createStore(reducers, applyMiddleware(thunk))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <WidgetContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
