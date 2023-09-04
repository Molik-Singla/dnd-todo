import React, { useEffect } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { apiDeleteTask, deleteTask } from "../features/taskSlice";
import { toastError } from "../helpers/ToastFunctions";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { format } from "date-fns";

const SingleTask = ({ task, index, isArchive = false, setOperationType, handleOpenModal }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const dispatch = useDispatch();

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleDeleteTask = async () => {
		try {
			dispatch(deleteTask(task));
			await dispatch(apiDeleteTask(task)).unwrap();
		} catch (err) {
			toastError(err?.message || "Something went wrong");
		}
	};

	const simplyfyDate = (date) => {
		const dateObject = new Date(date);
		return format(dateObject, "dd/MM/yyyy hh:mm a") || date;
	};

	return (
		<Draggable key={task._id} draggableId={task._id} index={index}>
			{(provided) => {
				return (
					<section
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="SINGLE_TASK h-auto py-3 px-3 pr-2 bg-white bg-opacity-80 rounded-lg my-1"
					>
						<div className="flex gap-2 justify-between items-center">
							<section className="flex flex-col gap-2">
								<p className={`text-sm ${task?.status === "Done" && "line-through"}`}>{task?.title}</p>
								<p className="text-xs text-gray-500">{simplyfyDate(task?.createdAt)}</p>
							</section>
							<div className="flex gap-2">
								{/* Edit Task */}
								{!isArchive && (
									<button
										onClick={() => {
											setOperationType("edit");
											handleOpenModal(task);
										}}
										className="bg-green-500 w-8 h-8 1xl:w-9 1xl:h-9 rounded-full text-white flex justify-center items-center"
									>
										<MdOutlineModeEditOutline className="font-bold text-xl" />
									</button>
								)}

								{/* Delete Task */}
								<button
									onClick={handleDeleteTask}
									className="bg-red-500 w-8 h-8 1xl:w-9 1xl:h-9 rounded-full text-white flex justify-center items-center"
								>
									<MdDeleteOutline className="font-bold text-xl" />
								</button>
							</div>
						</div>
					</section>
				);
			}}
		</Draggable>
	);
};

export default SingleTask;
