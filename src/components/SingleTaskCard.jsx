import React, { useEffect, useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { apiAddTask, apiEditTask, editTask } from "../features/taskSlice";
import SingleTask from "./SingleTask";
import TaskOperations from "./modals/TaskOperations";
import { toastError } from "../helpers/ToastFunctions";
import { nanoid } from "@reduxjs/toolkit";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////-
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SingleTaskCard = ({ title, tasks, taskType, isArchive = false }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const dispatch = useDispatch();
	const [TaskOperationsModalBool, setTaskOperationsModalBool] = useState(false);
	const [operationType, setOperationType] = useState("add"); // add / edit
	const [editDefaultValue, setEditDefaultValue] = useState("");

	const [showTasksArchiveBool, setShowTasksArchiveBool] = useState(false);

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleAddTask = async (task) => {
		const uniKey = nanoid();
		// const data = { ...task, _id: uniKey };
		try {
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

	useEffect(() => {
		if (isArchive && tasks?.length === 0) setShowTasksArchiveBool(false);
	}, [tasks]);

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

					<div className="flex gap-2 items-center">
						<span className="w-6 h-6 bg-white bg-opacity-60 rounded-full flex text-xs justify-center items-center font-semibold text-gray-500">
							{tasks?.length}
						</span>
						{isArchive && (
							<button
								onClick={() => {
									if (tasks?.length > 0) setShowTasksArchiveBool((prev) => !prev);
								}}
								className={`w-6 h-6 bg-white bg-opacity-60 rounded-full flex justify-center items-center transition-transform ${
									showTasksArchiveBool && "rotate-[-90deg]"
								}`}
							>
								<AiOutlineArrowLeft />
							</button>
						)}
					</div>
				</div>

				<section className="mt-2 w-full flex flex-col gap-4">
					<Droppable droppableId={taskType?.toLowerCase()}>
						{(provided) => {
							return (
								<section {...provided.droppableProps} ref={provided.innerRef} className="child TASKS mx-3 flex flex-col">
									{(isArchive ? isArchive && showTasksArchiveBool : tasks?.length > 0) &&
										tasks?.map((task, index) => {
											return (
												<SingleTask
													key={task._id}
													index={index}
													task={task}
													setOperationType={setOperationType}
													handleOpenModal={handleModalAndEditDefaultValue}
													isArchive={isArchive}
												/>
											);
										})}
									{provided.placeholder}
								</section>
							);
						}}
					</Droppable>

					{!isArchive && (
						<div className="w-full h-auto flex justify-end px-3">
							{/* Add a task */}
							<button
								onClick={() => {
									handleOpenModal();
									setOperationType("add");
								}}
								className="bg-green-500 w-8 h-8 1xl:w-9 1xl:h-9 rounded-full text-white flex justify-center items-center"
							>
								<MdOutlineAdd className="text-2xl" />
							</button>
						</div>
					)}
				</section>
			</section>
		</>
	);
};

export default SingleTaskCard;
