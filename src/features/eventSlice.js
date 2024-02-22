import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../services/apiConnector";
import { EventAPI } from "../services/apis";

const initialState = {
    data : []
}

export const getEvent = createAsyncThunk(
    "event/getEvent",
    async () =>{
        try{
            const response = await apiConnector({method:"GET", url:EventAPI.ViewEvent_API+`?pageNo=${1}&pageSize=${2}&dateDescSort=true`});
            return response.data.data
        } catch(err){
        //    console.log(err);
        }
    }
)

const eventSlice = createSlice({
    name : "event",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getEvent.fulfilled, (state,action)=>{
            if(action.payload){
                const data = action.payload;
                if(data){
                    return {
                        ...state,
                        data:data
                    }
                }
            }
            else{
                return state
            }
        })
    }
})

export default eventSlice.reducer