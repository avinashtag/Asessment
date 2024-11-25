// store.js
import {configureStore} from '@reduxjs/toolkit';
import stateReducer from './stateSlice'; // Import the reducer from the state slice

const store = configureStore({
  reducer: {
    states: stateReducer, // Connect the state slice reducer
  },
});

export default store;
