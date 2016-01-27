var {createStore, applyMiddleware} = require('redux');
var thunk = require('redux-thunk');
var reducer = require('../reducers'); // FIX THIS FOR FOLDER

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default (initialState) => {
  var store = createStoreWithMiddleware(reducer, initialState);
  return store;
};
