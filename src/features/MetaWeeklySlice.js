import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { MetaWeeklyAPI } from '../services/apis';

const initialState = {
    data: []
};


export const getMetaWeekly = createAsyncThunk(
    "metaWeekly/getMetaWeekly",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: MetaWeeklyAPI.ViewMeta_API + `?pageNo=1&pageSize=2&dateDescSort=true` })
            return response.data.data;
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
);


const metaWeeklySlice = createSlice({
    name: 'metaWeekly',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMetaWeekly.fulfilled, (state, action) => {
            if (action.payload) {
                const data = action.payload;
                if (data) {
                    return {
                        ...state,
                        data: data
                    }
                }
            }
            else {
                return state
            }
        });
    }
});

export default metaWeeklySlice.reducer
