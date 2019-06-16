import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import { store } from './helpers/_helpers';
import { App } from './App';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
