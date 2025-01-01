import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    //name of the slice user
    name:'user',
    //initialstate of the user slice
    initialState:null,
    //note it reducers not reducer
    reducers:{
       //method
       addUser:(state,action)=>{
              return action.payload;
       },
       removeUser:(state,action)=>{
        return null;
       }
    }
})


//export actions
export const{addUser,removeUser}=userSlice.actions;
//export reducer
export default userSlice.reducer;

//now last step is to add this slice to appStore