import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConnector } from '../services/apiConnector';
import { subScriptionProductAPI } from '../services/apis';


const initialState = {
    data: []
}

export const getSubscriptions = createAsyncThunk(
    "subscriptions/getSubscriptions",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: subScriptionProductAPI.viewAllSubscriptionProduct });
            // console.log(response?.data?.data)
            return response?.data?.data
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
)


const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubscriptions.fulfilled, (state, action) => {
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

export default subscriptionsSlice.reducer