import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { addTask, apiAddTask, apiEditTask, editTask } from "../features/taskSlice";
import SingleTask from "./SingleTask";
import TaskOperations from "./modals/TaskOperations";
import { toastError } from "../helpers/ToastFunctions";
import { nanoid } from "@reduxjs/toolkit";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////-
import { MdOutlineAdd } from "react-icons/md";

const SingleTaskCard = ({ title, tasks, taskType }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const [TaskOperationsModalBool, setTaskOperationsModalBool] = useState(false);
	const [operationType, setOperationType] = useState("add"); // add / edit
	const [editDefaultValue, setEditDefaultValue] = useState("");

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleAddTask = async (task) => {
		const uniKey = nanoid();
		const data = { ...task, _id: uniKey };
		try {
			dispatch(addTask(data));
			await dispatch(apiAddTask({ ...task, uniKey })).unwrap();
		} catch (err) {
			toastError(err?.message || "Something went wrong");
		}
	};
	const handleEditTask = async (task) => {
		try {
			dispatch(editTask(task));
			await dispatch(apiEditTask(task)).unwrap();
		} catch (err) {
			toastError(err?.message || "Something went wrong");
		}
	};

	const handleOpenModal = () => setTaskOperationsModalBool(true);
	const handleModalAndEditDefaultValue = (task) => {
		handleOpenModal();
		setEditDefaultValue(task);
	};
	const handleCloseModal = () => setTaskOperationsModalBool(false);

	return (
		<>
			{TaskOperationsModalBool && (
				<TaskOperations
					handleCloseModal={handleCloseModal}
					operationType={operationType}
					taskType={taskType}
					handleOperation={operationType.toLowerCase() === "add" ? handleAddTask : handleEditTask}
					editDefaultValue={operationType.toLowerCase() === "edit" ? editDefaultValue : null}
				/>
			)}
			<section className="parent SINGLE_TASK_CONTAINER w-80 h-auto pb-4 bg-white bg-opacity-50 rounded-xl shadow-[3px_4px_20px_-4px_#ffffff61]">
				<div className="task_header flex justify-between p-3">
					<p className="font-semibold">{title}</p>
					<span className="w-5 h-5 bg-white bg-opacity-60 rounded-full flex text-[10px] justify-center items-center font-semibold text-gray-500">
						{tasks?.length}
					</span>
				</div>

				<section className="mt-2 w-full flex flex-col gap-4">
					<Droppable droppableId={taskType?.toLowerCase()}>
						{(provided) => {
							return (
								<section {...provided.droppableProps} ref={provided.innerRef} className="child TASKS mx-3 flex flex-col">
									{tasks.map((task, index) => {
										return (
											<SingleTask
												key={task._id}
												index={index}
												task={task}
												setOperationType={setOperationType}
												handleOpenModal={handleModalAndEditDefaultValue}
											/>
										);
									})}
									{provided.placeholder}
								</section>
							);
						}}
					</Droppable>

					<div className="w-full h-auto flex justify-end px-3">
						{/* Add a task */}
						<button
							onClick={() => {
								handleOpenModal();
								setOperationType("add");
							}}
							className="bg-green-500 w-6 h-6 rounded-full text-white flex justify-center items-center"
						>
							<MdOutlineAdd />
						</button>
					</div>
				</section>
			</section>
		</>
	);
};

export default SingleTaskCard;
