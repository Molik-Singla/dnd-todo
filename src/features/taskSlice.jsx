import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
	tasks: {
		todo: [],
		doing: [],
		done: [],
		archived: [],
	},
	// loading: false,
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
	const { uniKey } = payload;
	delete payload.uniKey;
	try {
		const result = await axios.post(`${API_URL}/task`, payload, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
		return (result?.data?.data?.task && { ...result?.data?.data?.task, uniKey }) || {};
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiDeleteTask = createAsyncThunk("apiDeleteTask", async (payload, thunkAPI) => {
	try {
		await axios.delete(`${API_URL}/task/${payload._id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
		return payload;
	} catch (error) {
		return thunkAPI.rejectWithValue(error?.response?.data);
	}
});
export const apiEditTask = createAsyncThunk("apiEditTask", async (payload, thunkAPI) => {
	try {
		const result = await axios.patch(`${API_URL}/task/${payload._id}`, payload, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } });
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
		deleteTask: (state, action) => {
			state.tasks[action.payload.status.toLowerCase()] = state.tasks[action.payload.status.toLowerCase()].filter(
				(task) => task._id !== action.payload._id
			);
		},
		addTask: (state, action) => {
			state.tasks[action.payload.status.toLowerCase()].push(action.payload);
		},
		editTask: (state, action) => {
			const status = action.payload.status.toLowerCase();
			const index = state.tasks[status].findIndex((task) => task._id === action.payload._id);
			const oldData = state.tasks[status][index];
			state.tasks[status][index] = { ...oldData, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(apiAddTask.fulfilled, (state, action) => {
				// const status = action.payload.status.toLowerCase();
				// const index = state.tasks[status].findIndex((task) => task._id === action.payload?.uniKey);
				// delete action.payload.uniKey;
				// state.tasks[status][index] = action.payload;
				state.tasks[action.payload.status.toLowerCase()].push(action.payload);
			})
			.addCase(apiGetTasks.fulfilled, (state, action) => {
				const myPayload = action.payload;
				const todo = [];
				const doing = [];
				const done = [];
				const archived = [];
				myPayload &&
					myPayload?.forEach((task) => {
						if (task.status.toLowerCase() === "todo") todo.push(task);
						else if (task.status.toLowerCase() === "doing") doing.push(task);
						else if (task.status.toLowerCase() === "done") done.push(task);
						else if (task.status.toLowerCase() === "archived") archived.push(task);
					});
				state.tasks = { todo, doing, done, archived };
			});
		builder.addMatcher(isPending(apiGetTasks, apiAddTask, apiDeleteTask, apiEditTask), (state, action) => {
			state.error = null;
		});
		builder.addMatcher(isRejected(apiGetTasks, apiAddTask, apiDeleteTask, apiEditTask), (state, action) => {
			state.error = action.payload;
		});
	},
});

export const { updateTasksPosition, deleteTask, addTask, editTask } = taskSlice.actions;
export const selectTaskState = (state) => state.task;
export default taskSlice.reducer;
