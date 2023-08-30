import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./SingleTask";
import TaskOperations from "./modals/TaskOperations";
import Loader from "./Loader";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////-
import { MdOutlineAdd } from "react-icons/md";

const SingleTaskCard = ({ tasks, title, taskType, myTaskState, handleTasks }) => {
	console.log("🚀 ~ file: SingleTaskCard.jsx:12 ~ SingleTaskCard ~ tasks:", tasks);
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const [taskOperationsModal, setTaskOperationsModal] = useState({
		bool: false,
		type: "add",
		payload: {},
	});

	const handleCloseModal = () => setTaskOperationsModal((prev) => ({ ...prev, bool: false }));
	const handleOpenModal = (type = "add", payload) => setTaskOperationsModal((prev) => ({ ...prev, type, payload, bool: true }));

	return (
		<>
			{taskOperationsModal?.bool && (
				<TaskOperations
					taskType={taskType}
					taskOperationsModal={taskOperationsModal}
					handleAddTask={(taskType, data) => {
						handleTasks.handleAddTask(taskType, data);
						handleCloseModal();
					}}
					handleCloseModal={handleCloseModal}
					handleEditTask={(taskType, data) => {
						handleTasks.handleEditTask(taskType, data);
						handleCloseModal();
					}}
				/>
			)}

			<section className="parent SINGLE_TASK_CONTAINER w-80 h-auto pb-4 bg-white bg-opacity-50 rounded-xl shadow-[3px_4px_20px_-4px_#ffffff61]">
				<div className="task_header flex justify-between p-3">
					<p className="font-semibold">{title}</p>
					<span className="w-5 h-5 bg-white bg-opacity-60 rounded-full flex text-[10px] justify-center items-center font-semibold text-gray-500">
						{tasks?.length || 0}
					</span>
				</div>

				<section className="mt-2 w-full flex flex-col gap-4">
					{!myTaskState.loading && (
						<Droppable droppableId={taskType}>
							{(provided, snapshot) => {
								return (
									<section {...provided.droppableProps} ref={provided.innerRef} className="child TASKS mx-3 flex flex-col">
										{tasks?.map((task, ind) => {
											return (
												<SingleTask
													key={task._id}
													taskType={taskType}
													index={ind}
													handleDeleteTask={handleTasks.handleDeleteTask}
													handleOpenModal={handleOpenModal}
													task={task}
												/>
											);
										})}
										{provided.placeholder}
									</section>
								);
							}}
						</Droppable>
					)}

					{myTaskState.loading && (
						<section className="w-full h-full flex justify-center items-center">
							<div className="w-full h-10">
								<Loader />
							</div>
						</section>
					)}

					<div className="w-full h-auto flex justify-end px-3">
						<button
							onClick={() => handleOpenModal("add")}
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
