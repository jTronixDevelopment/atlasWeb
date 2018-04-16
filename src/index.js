import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppReducers from './redux/reducermain.js';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(AppReducers)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
