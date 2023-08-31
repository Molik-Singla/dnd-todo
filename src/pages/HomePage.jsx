import React, { useEffect } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import SingleTaskCard from "../components/SingleTaskCard";
import { apiEditTask, apiGetTasks, editTask, selectTaskState, updateTasksPosition } from "../features/taskSlice";
import { toastError } from "./../helpers/ToastFunctions";

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const HomePage = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const taskState = useSelector(selectTaskState);

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleDragEnd = async (result) => {
		const { destination, source } = result;
		if (!destination) return;

		let todo = [...taskState?.tasks.todo];
		let doing = [...taskState?.tasks.doing];
		let done = [...taskState?.tasks.done];
		let archived = [...taskState?.tasks.archived];

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
		} else if (source.droppableId === "archived") {
			add = archived[source.index];
			archived.splice(source.index, 1);
		}

		// For adding to its destination
		if (destination.droppableId === "todo") todo.splice(destination.index, 0, add);
		else if (destination.droppableId === "doing") doing.splice(destination.index, 0, add);
		else if (destination.droppableId === "done") done.splice(destination.index, 0, add);
		else if (destination.droppableId === "archived") archived.splice(destination.index, 0, add);

		// For local state
		dispatch(updateTasksPosition({ todo, doing, done, archived }));

		const dataToBeUpdate = { _id: add._id, status: capitalizeFirstLetter(destination.droppableId) };
		dispatch(editTask(dataToBeUpdate));

		// For api
		try {
			await dispatch(apiEditTask(dataToBeUpdate)).unwrap();
		} catch (err) {
			toastError(err?.message || "Something went wrong");
		}
	};

	useEffect(() => {
		const getTasks = async () => {
			try {
				await dispatch(apiGetTasks()).unwrap();
			} catch (err) {
				toastError(err?.message || "Something went wrong");
			}
		};
		getTasks();
	}, []);

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<section className="mt-12 flex flex-wrap justify-center gap-12 items-start px-4 h-full">
					<SingleTaskCard taskType="Todo" title={"Todo"} tasks={taskState?.tasks?.todo} />
					<SingleTaskCard taskType="Doing" title={"Doing"} tasks={taskState?.tasks?.doing} />
					<SingleTaskCard taskType="Done" title={"Done"} tasks={taskState?.tasks?.done} />
					<SingleTaskCard taskType="Archived" title={"Archived"} tasks={taskState?.tasks?.archived} isArchive={true} />
				</section>
			</DragDropContext>
		</>
	);
};

export default HomePage;
