import { createStore } from 'redux';
import beerReducer from './reducers';

const store = createStore(beerReducer);

export default store;
