import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import toast from 'react-hot-toast';
import { BASE_URL } from './../services/apis';

// import { io } from "socket.io-client";

const initialState = {
    token: localStorage.getItem('userToken'),
    name: "",
    email: '',
    hasSubscription: '',
    _id: '',
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/userLogin`, {
                email: user.email,
                password: user.password
            });
            // console.log(res.data);
            if (res.data.success) {
                toast.success("Login Successful")
                localStorage.setItem('userToken', res.data.token);

                // console.log(res.data);

                // jwtDecode(res.data.token);
                
                // const socket = io(BASE_URL);
                // socket.emit("new-user-joined", user._id);
            }

            return res.data.token;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token

            if (token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    hasSubscription: user.hasSubscription,
                };
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem('userToken');

            return {
                ...state,
                token: "",
                name: "",
                email: '',
                hasSubscription: '',
                _id: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    hasSubscription: user.hasSubscription,
                }
            }
            else {
                return state
            }
        });
    }
});

export const { loadUser, logoutUser } = userSlice.actions
export default userSlice.reducer
