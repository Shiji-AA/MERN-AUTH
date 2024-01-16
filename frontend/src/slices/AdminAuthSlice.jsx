import {createSlice} from '@reduxjs/toolkit';   //importing a method create slice from reduxjs

const initialState={
    adminInfo:localStorage.getItem('adminInfo')? 
    JSON.parse(localStorage.getItem('adminInfo')):null,//It tries to retrieve the admin information from the local storage and parses it as JSON. If the data is not present in local storage, it initializes adminInfo to null.
};
const adminAuthSlice= createSlice(
    {    //assigning to a variable called authSlice   and in this we need to add name,initial state,reducer
    name:'adminAuth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{   //reducer has state , action, logic            
            state.adminInfo=action.payload; //data we are passed is known as payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        },
    },
});

export const{setCredentials,logout}=adminAuthSlice.actions //methods will be destructured and exported ,for using in react
export default adminAuthSlice.reducer;  //here after updating the state it will export to store


