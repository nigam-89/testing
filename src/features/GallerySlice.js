import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { HandleImagesAPI } from '../services/apis';

const initialState = {
    data: []
};


export const getGallery = createAsyncThunk(
    "gallery/getGallery",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: HandleImagesAPI.ViewGallery_API + `?pageNo=1&pageSize=8&dateDescSort=true&category=gallery` })
            return response.data.data;
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
);


const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGallery.fulfilled, (state, action) => {
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

export default gallerySlice.reducer
