import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { OpinionBoxAPI } from '../services/apis';

const initialState = {
    data : []
}

export const getOpinionBox = createAsyncThunk(
    "opinionBox/getOpinionBox",
    async () =>{
        try {
            const response = await apiConnector({ method: "GET", url: OpinionBoxAPI.ViewOpinionBox_API + `?pageNo=${1}&pageSize=${2}&dateDescSort=true` })
            return response.data.data
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
)

const opinionBoxSlice = createSlice({
    name : "opinionBox",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getOpinionBox.fulfilled,(state,action)=>{
            if(action.payload){
                const data = action.payload;
                if(data){
                    return{
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


export default opinionBoxSlice.reducer