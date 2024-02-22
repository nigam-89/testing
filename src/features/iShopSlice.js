import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { IShopsAPI } from '../services/apis';


const initialState = {
    data: []
}

export const getiShop = createAsyncThunk(
    "iShop/getiShop",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: IShopsAPI.ViewProducts_API })
            return response.data.data
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
)


const iShopSlice = createSlice({
    name: "iShop",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getiShop.fulfilled, (state, action) => {
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

export default iShopSlice.reducer