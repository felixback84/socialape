// memory pf the app
// redux stuff
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

// empty initial state
const initialState = {};

// middlaware of redux
const middleware = [thunk];

// combine object reducers
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

// creation of store and dev redux tools
const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); 

export default store;