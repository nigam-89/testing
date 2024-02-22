import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { GovNotificationAPI } from '../services/apis';


const initialState = {
    data: []
};


export const getGovtNotification = createAsyncThunk(
    "govtNotification/getGovtNotification",
    async () => {
        try {
            const response = await apiConnector({ method: "GET", url: GovNotificationAPI.ViewNoti_API + `?numAllCatLatest=5` })
            return response.data.data;
        } catch (error) {
            // toast.error(`Server is Busy right now.`);
        }
    }
);


const govtNotificationSlice = createSlice({
    name: 'govtNotification',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGovtNotification.fulfilled, (state, action) => {
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

export default govtNotificationSlice.reducer
