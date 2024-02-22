import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { TopStoiresAPI } from '../services/apis';

const initialState = {
    data: []
};


export const getTopStories = createAsyncThunk(
    "topStories/getTopStories",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: TopStoiresAPI.ViewTopStories_API + `?pageNo=${1}&pageSize=${2}&dateDescSort=true` })
            return response.data.data;
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
);


const topStoriesSlice = createSlice({
    name: 'topStories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTopStories.fulfilled, (state, action) => {
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

export default topStoriesSlice.reducer
