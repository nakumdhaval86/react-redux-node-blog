import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import RootReducer from './reducers/RootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import Thunk from 'redux-thunk';

const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(Thunk)));

ReactDOM.render(
    <Provider store={store}>
      <Router>
    <App />
    </Router>
    </Provider>,
  document.getElementById('root')
);
