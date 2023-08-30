import React, { useEffect, useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { DragDropContext } from "react-beautiful-dnd";
import SingleTaskCard from "../components/SingleTaskCard";
import { useDispatch } from "react-redux";
import { apiAddTask, apiGetTasks, selectTaskState, updateTasksPosition } from "../features/taskSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const taskState = useSelector(selectTaskState);

	const taskTypesForApi = (taskType) => {
		return taskType.toLowerCase() === "todo" ? "To-Do" : taskType.toLowerCase() === "doing" ? "Doing" : "Done";
	};

	const [tasks, setTasks] = useState();
	const handleDragEnd = (result) => {
		const { destination, source } = result;
		if (!destination) return;

		let todo = [...taskState?.tasks.todo];
		let doing = [...taskState?.tasks.doing];
		let done = [...taskState?.tasks.done];

		let add = null;

		// For removing from source
		if (source.droppableId === "todo") {
			add = todo[source.index];
			todo.splice(source.index, 1);
		} else if (source.droppableId === "doing") {
			add = doing[source.index];
			doing.splice(source.index, 1);
		} else if (source.droppableId === "done") {
			add = done[source.index];
			done.splice(source.index, 1);
		}

		// For adding to its destination
		if (destination.droppableId === "todo") {
			todo.splice(destination.index, 0, add);
		} else if (destination.droppableId === "doing") {
			doing.splice(destination.index, 0, add);
		} else if (destination.droppableId === "done") {
			done.splice(destination.index, 0, add);
		}

		dispatch(updateTasksPosition({ todo, doing, done }));
	};

	const handleAddTask = (taskType, newTask) => {
		dispatch(apiAddTask({ title: newTask?.title, status: taskTypesForApi(taskType) }));
	};
	const handleEditTask = (taskType, updatedTask) => {
		setTasks((prevTasks) => ({
			...prevTasks,
			[taskType]: prevTasks[taskType].map((prevTask) => (prevTask?.id === updatedTask?.id ? updatedTask : prevTask)),
		}));
	};
	const handleDeleteTask = (taskType, deleteId) => {
		setTasks((prevTasks) => ({ ...prevTasks, [taskType]: prevTasks[taskType].filter((prevTask) => prevTask?.id !== deleteId) }));
	};

	const handleTasks = {
		handleAddTask,
		handleEditTask,
		handleDeleteTask,
	};

	useEffect(() => {
		dispatch(apiGetTasks());
	}, []);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<section className="mt-8 flex flex-wrap justify-center gap-12 items-start px-4">
				<SingleTaskCard taskType="todo" title="To Do" tasks={taskState?.tasks.todo} myTaskState={taskState} handleTasks={handleTasks} />
				<SingleTaskCard taskType="doing" title="Doing" tasks={taskState?.tasks.doing} myTaskState={taskState} handleTasks={handleTasks} />
				<SingleTaskCard taskType="done" title="Done" tasks={taskState?.tasks.done} myTaskState={taskState} handleTasks={handleTasks} />
			</section>
		</DragDropContext>
	);
};

export default HomePage;
