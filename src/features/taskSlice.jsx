import { createAsyncThunk, createSlice, current, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
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
		return result?.data?.data?.task || {};
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiDeleteTask = createAsyncThunk("apiDeleteTask", async (payload, thunkAPI) => {
	try {
		await axios.delete(`${API_URL}/task/${payload.id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
		return payload;
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiEditTask = createAsyncThunk("apiEditTask", async (payload, thunkAPI) => {
	try {
		const result = await axios.patch(`${API_URL}/task/${payload.id}`, payload, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
		builder
			.addCase(apiAddTask.fulfilled, (state, action) => {
				state.loading = false;
				const status = action.payload.status.toLowerCase();
				state.tasks[status].push(action.payload);
			})
			.addCase(apiGetTasks.fulfilled, (state, action) => {
				state.loading = false;
				const myPayload = action.payload;
				const todo = [];
				const doing = [];
				const done = [];
				myPayload &&
					myPayload?.forEach((task) => {
						if (task.status.toLowerCase() === "todo") todo.push(task);
						else if (task.status.toLowerCase() === "doing") doing.push(task);
						else if (task.status.toLowerCase() === "done") done.push(task);
					});
				state.tasks = { todo, doing, done };
			})
			.addCase(apiEditTask.fulfilled, (state, action) => {
				state.loading = false;

				const status = action.payload.status.toLowerCase();
				const index = state.tasks[status].findIndex((task) => task._id === action.payload._id);
				state.tasks[status][index] = action.payload;
			})
			.addCase(apiDeleteTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks[action.payload.status.toLowerCase()] = state.tasks[action.payload.status.toLowerCase()].filter(
					(task) => task._id !== action.payload.id
				);
			});
		builder.addMatcher(isPending(apiGetTasks, apiAddTask, apiDeleteTask, apiEditTask), (state, action) => {
			state.loading = true;
			state.error = null;
		});
		builder.addMatcher(isRejected(apiGetTasks, apiAddTask, apiDeleteTask, apiEditTask), (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { updateTasksPosition, deleteTask } = taskSlice.actions;
export const selectTaskState = (state) => state.task;
export default taskSlice.reducer;
