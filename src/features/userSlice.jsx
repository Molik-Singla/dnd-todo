import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
	user: null,
	loading: false,
	error: null,
};

export const apiSignup = createAsyncThunk("apiSignup", async (payload, thunkAPI) => {
	try {
		const result = await axios.post(`${API_URL}/auth/signup`, payload);
		return result?.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiLogin = createAsyncThunk("apiLogin", async (payload, thunkAPI) => {
	try {
		const result = await axios.post(`${API_URL}/auth/login`, payload);
		return result?.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending(apiSignup, apiLogin), (state, action) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isFulfilled(apiSignup, apiLogin), (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addMatcher(isRejected(apiSignup, apiLogin), (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const selectUserState = (state) => state.user;
export default userSlice.reducer;
