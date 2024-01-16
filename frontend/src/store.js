import {configureStore} from '@reduxjs/toolkit';     //this  is a function to  create redux store
import authReducer from './slices/authSlice';         //importing reducers from slices;
import { apiSlice } from './slices/apiSlice';

const store = configureStore({      //storing into a variable called store
    reducer:{
        auth:authReducer,  // authReducer will known as auth in react applications
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store;    //then only provider can inject this into react

