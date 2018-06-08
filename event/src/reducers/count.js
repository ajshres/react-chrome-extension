const initialData = 0;
export default (oldState = initialData, action) => {
    let state = oldState || 0;
    if(action.type === 'initializeState') {
        return action.count;
    }
    console.log("==========>DISPATCH",action);
    switch (action.type) {
        case 'INCREASE_COUNT':
            state = state+1;
            break;
        case 'DECREASE_COUNT':
            state = state - 1;
            break;
        case 'CLEAR_ALL':
            state = 0;
            break;
        default:
            break;
    }
    /* if(oldState != state) {
        chrome.storage.local.set({'count':{...state}});
    } */
    return state;
};