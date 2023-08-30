import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const TaskOperations = ({ operationType, editDefaultValue, taskType, handleOperation, handleCloseModal }) => {
	const [taskInput, setTaskInput] = useState("");
	const taskInputRef = useRef(null);

	useEffect(() => {
		setTaskInput(editDefaultValue?.title || "");
		taskInputRef.current.focus();
	}, []);

	const handleSubmit = () => {
		if (operationType.toLowerCase() === "edit") handleOperation({ title: taskInput, status: taskType, id: editDefaultValue._id });
		else handleOperation({ title: taskInput, status: taskType });
		handleCloseModal();
	};

	return ReactDOM.createPortal(
		<section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center font-primary">
			<section className="bg-white w-full max-w-xs h-auto rounded-xl shadow-[4px_4px_18px_-4px_#ffffff61] p-4">
				<div className="flex flex-col gap-4">
					<p className="font-semibold text-lg">{operationType[0].toUpperCase() + operationType.slice(1)} a Task</p>
					<form onSubmit={(evt) => evt.preventDefault()} className="INPUT_DIV flex flex-col gap-2">
						<input
							className="rounded-md border border-gray-300 bg-gray-50/30 p-2 px-4 placeholder:text-gray-500 placeholder:text-sm outline-none"
							type="text"
							placeholder="Enter a task Here..."
							value={taskInput}
							onChange={(evt) => setTaskInput(evt.target.value)}
							onKeyDown={(evt) => evt.key === "Enter" && taskInput?.length >= 1 && handleSubmit()}
							autoComplete="off"
							ref={taskInputRef}
						/>
					</form>
				</div>
				<div className="mt-8 flex justify-end gap-3">
					<button onClick={handleCloseModal} className="bg-red-500 text-white p-2 px-8 rounded-lg font-semibold">
						Close
					</button>
					<button
						disabled={taskInput?.length < 1}
						onClick={handleSubmit}
						className="bg-green-500 text-white p-2 px-8 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{operationType[0].toUpperCase() + operationType.slice(1)} Task
					</button>
				</div>
			</section>
		</section>,
		document.getElementById("modal")
	);
};

export default TaskOperations;
