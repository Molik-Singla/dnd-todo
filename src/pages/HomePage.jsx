import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { DragDropContext } from "react-beautiful-dnd";
import SingleTaskCard from "../components/SingleTaskCard";

const HomePage = () => {
	const [tasks, setTasks] = useState({
		todo: [
			{
				id: "adhbajkdb",
				title: "Buy Groceries",
			},
		],
		doing: [
			{
				id: "dhahdadad",
				title: "Doing Coding",
			},
			{
				id: "osyeiohasd",
				title: "See the Match IND vs PAK",
			},
		],
		done: [
			{
				id: "teioshdssd",
				title: "But wireless mouse and keyboard",
			},
		],
	});
	const handleDragEnd = (result) => {
		const { destination, source } = result;
		if (!destination) return;

		let todo = [...tasks.todo];
		let doing = [...tasks.doing];
		let done = [...tasks.done];

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

		setTasks({ todo, doing, done });
	};

	const handleAddTask = (taskType, newTask) => {
		setTasks((prevTasks) => ({ ...prevTasks, [taskType]: [newTask, ...prevTasks[taskType]] }));
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
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<section className="mt-8 flex flex-wrap justify-center gap-12 items-start px-4">
				<SingleTaskCard taskType="todo" title="To Do" tasks={tasks.todo} handleTasks={handleTasks} />
				<SingleTaskCard taskType="doing" title="Doing" tasks={tasks.doing} handleTasks={handleTasks} />
				<SingleTaskCard taskType="done" title="Done" tasks={tasks.done} handleTasks={handleTasks} />
			</section>
		</DragDropContext>
	);
};

export default HomePage;
