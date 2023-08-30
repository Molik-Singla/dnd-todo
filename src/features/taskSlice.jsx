import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://taskboard-r5sb.onrender.com";

const initialState = {
	tasks: {
		todo: [],
		doing: [],
		done: [],
	},
	loading: false,
	error: null,
};

export const apiGetTasks = createAsyncThunk("apiGetTasks", async (payload, thunkAPI) => {
	try {
		const result = await axios.get(`${API_URL}/task`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
		return result?.data?.data?.tasks || [];
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiAddTask = createAsyncThunk("apiAddTask", async (payload, thunkAPI) => {
	try {
		const result = await axios.post(`${API_URL}/task`, payload, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
		console.log("🚀 ~ file: taskSlice.jsx:25 ~ apiAddTask ~ result:", result);
		return result?.data?.data?.task || {};
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		updateTasksPosition: (state, action) => {
			state.tasks = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(apiAddTask.fulfilled, (state, action) => {
			state.loading = false;
			console.log("🚀 ~ file: taskSlice.jsx:42 ~ .addCase ~ action:", action);
			state.tasks[action.payload.status.toLowerCase()].push(action.payload);
		});
		builder.addMatcher(isPending(apiGetTasks, apiAddTask), (state, action) => {
			state.loading = true;
			state.error = null;
		});
		builder.addMatcher(isFulfilled(apiGetTasks), (state, action) => {
			state.loading = false;
			const myPayload = action.payload;
			const todo = [];
			const doing = [];
			const done = [];
			myPayload?.forEach((task) => {
				if (task.status.toLowerCase() === "to-do") todo.push(task);
				else if (task.status.toLowerCase() === "doing") doing.push(task);
				else if (task.status.toLowerCase() === "done") done.push(task);
			});
			state.tasks = { todo, doing, done };
		});
		builder.addMatcher(isRejected(apiGetTasks, apiAddTask), (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { updateTasksPosition } = taskSlice.actions;
export const selectTaskState = (state) => state.task;
export default taskSlice.reducer;
