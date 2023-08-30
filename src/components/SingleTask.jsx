import React from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { Draggable } from "react-beautiful-dnd";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

const SingleTask = ({ task, taskType, index, handleDeleteTask, handleOpenModal }) => {
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
							<p className="text-sm">{task?.title}</p>
							<div className="flex gap-2">
								<button
									onClick={() => {
										handleOpenModal("edit", { id: task?.id, title: task?.title });
									}}
									className="bg-green-500 w-6 h-6 rounded-full text-white flex justify-center items-center"
								>
									<MdOutlineModeEditOutline className="font-bold " />
								</button>
								<button
									onClick={() => {
										handleDeleteTask(taskType, task?.id);
									}}
									className="bg-red-500 w-6 h-6 rounded-full text-white flex justify-center items-center"
								>
									<MdDeleteOutline className="font-bold " />
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
