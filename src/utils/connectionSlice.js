import {createSlice} from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'conection',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnections:(state,ation)=>null
    }
})

export const{addConnections,removeConnections}=connectionSlice.actions;
export default connectionSlice.reducer;