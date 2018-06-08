import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Store from './Store';

import App from './App';


const anchor = document.createElement('div');
anchor.id = 'fm-rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
  <Provider store={Store}>
    <App />
  </Provider>
  , document.getElementById('fm-rcr-anchor'));
