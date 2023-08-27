import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import SingleTask from "./SingleTask";
import TaskOperations from "./modals/TaskOperations";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////-
import { MdOutlineAdd } from "react-icons/md";

const SingleTaskCard = ({ title }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const [tasks, setTasks] = useState([
		{ id: "sdgbsgdghdas", title: "Buy Groceries" },
		{ id: "iwetruwisdad", title: "Do DSA for 1 Hour" },
	]);

	const [taskOperationsModal, setTaskOperationsModal] = useState({
		bool: false,
		type: "add",
		payload: {},
	});

	const handleDeleteTask = (deleteId) => {
		setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask?.id !== deleteId));
	};

	const handleCloseModal = () => setTaskOperationsModal((prev) => ({ ...prev, bool: false }));
	const handleOpenModal = (type = "add", payload) => setTaskOperationsModal((prev) => ({ ...prev, type, payload, bool: true }));

	const handleAddTask = (newTask) => {
		setTasks((prevTasks) => [newTask, ...prevTasks]);
		handleCloseModal();
	};
	const handleEditTask = (updatedTask) => {
		setTasks((prevTasks) => prevTasks.map((prevTask) => (prevTask?.id === updatedTask?.id ? updatedTask : prevTask)));
		handleCloseModal();
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const updatedItems = Array.from(tasks);
		const [movedItem] = updatedItems.splice(result.source.index, 1);
		updatedItems.splice(result.destination.index, 0, movedItem);

		setTasks(updatedItems);
	};

	return (
		<>
			{taskOperationsModal?.bool && (
				<TaskOperations
					taskOperationsModal={taskOperationsModal}
					handleAddTask={handleAddTask}
					handleCloseModal={handleCloseModal}
					handleEditTask={handleEditTask}
				/>
			)}
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => {
						return (
							<section
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="SINGLE_TASK_CONTAINER w-80 h-auto pb-4 bg-white bg-opacity-50 rounded-xl shadow-[3px_4px_20px_-4px_#ffffff61]"
							>
								<div className="task_header flex justify-between p-3">
									<p className="font-semibold">{title}</p>
									<span className="w-5 h-5 bg-white bg-opacity-60 rounded-full flex text-[10px] justify-center items-center font-semibold text-gray-500">
										{tasks?.length || 0}
									</span>
								</div>

								<section className="mt-2 w-full flex flex-col gap-4">
									<section className="TASKS mx-3 flex flex-col gap-3">
										{tasks?.map((task, ind) => {
											return (
												<Draggable key={task.id} draggableId={task.id} index={ind}>
													{(provided) => {
														return (
															<section ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
																<SingleTask handleDeleteTask={handleDeleteTask} handleOpenModal={handleOpenModal} task={task} />
															</section>
														);
													}}
												</Draggable>
											);
										})}
									</section>

									<div className="w-full h-auto flex justify-end px-3">
										<button
											onClick={() => handleOpenModal("add")}
											className="bg-green-500 w-6 h-6 rounded-full text-white flex justify-center items-center"
										>
											<MdOutlineAdd />
										</button>
									</div>
								</section>
								{provided.placeholder}
							</section>
						);
					}}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default SingleTaskCard;
{
	/* <div className="bg-gray-300 bg-opacity-30 p-2 rounded-lg mt-1">
								<p className="text-sm">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tempore quod, sit aspernatur ad vitae facilis est voluptatum
									fugiat atque beatae modi quis culpa similique. Ex ab alias reiciendis amet!
								</p>
							</div> */
}
