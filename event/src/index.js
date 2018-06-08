import { createStore } from 'redux';
import rootReducer from './reducers';

import { wrapStore } from 'react-chrome-redux';

const store = createStore(rootReducer, {});
wrapStore(store, {
    portName: 'example'
});

console.log("*** CHROME EXTENTION INITIALIZATION IN BACKGROUND ***");

chrome.storage.local.get(['count'],function(ob){
    console.log("Event::index ==>  Chrome Sync",ob);
    store.dispatch({    
        'type':'initializeState',
        'count':ob.count || 0
    });
});