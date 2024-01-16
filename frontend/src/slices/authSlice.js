import {createSlice} from '@reduxjs/toolkit';   //importing a method create slice from reduxjs

const initialState={
    userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
};
const authSlice= createSlice(
    {    //assigning to a variable called authSlice   and in this we need to add name,initial state,reducer
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{    //reducer has state , action, logic            
            state.userInfo=action.payload; //data we are passed is known as payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const{setCredentials,logout}=authSlice.actions;  //methods will be destructured and exported ,for using in react
export default authSlice.reducer;  //here after updating the state it will export to store