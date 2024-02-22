import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { LatestVideosAPI } from '../services/apis';

const initialState = {
    data: []
}


export const getLatestVideos = createAsyncThunk(
    "latestVideos/getLatestStories",
    async () => {

        try {
            const response = await apiConnector({ method: "GET", url: LatestVideosAPI.ViewLatestVideos_API + `?pageNo=${1}&pageSize=${4}&dateDescSort=true`, })
            return response.data.data
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }

    }
)

const latestVideosSlice = createSlice({
    name: "latestVideos",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLatestVideos.fulfilled, (state, action) => {
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
        })
    }
})

export default latestVideosSlice.reducer