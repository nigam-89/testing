import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { HandleImagesAPI } from '../services/apis';

const initialState = {
    data: []
};


export const getHomeSlider = createAsyncThunk(
    "homeSlider/getHomeSlider",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: HandleImagesAPI.ViewGallery_API + `?pageNo=1&pageSize=10&dateDescSort=true&category=slider` })
            return response.data.data;
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
);


const homeSliderSlice = createSlice({
    name: 'homeSlider',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getHomeSlider.fulfilled, (state, action) => {
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

export default homeSliderSlice.reducer
