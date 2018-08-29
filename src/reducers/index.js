import { combineReducers } from 'redux';
import lockControls from './lockControlReducers';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    lockControls,
    routing: routerReducer
});

export default rootReducer;