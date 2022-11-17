import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import RefreshContext from "../contexts/RefreshContext";
import { Tasks, EmptyCircle, CircleFill } from "../layouts/common/Components";
import { addTask } from "../services/requests";

export function UserToDoTasks(tasks: any) {
	const [text, setText] = useState("");
	const { userData } = useContext(UserContext);
	const { refresh, setRefresh } = useContext(RefreshContext);

	function newTask() {
		if (text === "") {
			toast.error("Please, write a task");
			return;
		}

		const body = { description: text, taskType: "todo" };
		const token = userData?.token;

		const req = addTask(body, token);
		req.then(() => {
			toast.success("Task added");
			setRefresh(!refresh);
			setText("");
		}).catch((err) => {
			toast.error("An error occurred while trying to add your task");
			console.log(err);
		});
	}

	return(
		<Tasks>
			<div>
				<EmptyCircle />
				<Input 
					type="text"
					placeholder="this is a new task"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<a onClick={newTask}>add</a>
			</div>
			{tasks.tasks.map((item: any, index: number) => (
				<>	
					<div key={index}>
						<EmptyCircle />
						<p>{item.description}</p>
						<a>delete</a>
					</div>								
				</>
			))}
		</Tasks>
	);
}

export function UserDoneTasks(tasks: any) {
	return(
		<Tasks>
			{tasks.tasks.map((item: any, index: number) => (
				<>
					<div key={index}>
						<CircleFill />
						<p>{item.description}</p>
						<a>delete</a>
					</div>								
				</>
			))}
		</Tasks>
	);
}

const Input = styled.input`
	width: 100%;
	border: none;
	font-size: 1rem;
    line-height: 1.2rem;

	::placeholder {
		color: #000;
		font-weight: 700;
	}

	:focus::placeholder {
		color: transparent;
	}

	@media(min-width: 1024px){
		font-size: 1.2rem;
		line-height: 1.5rem;
	}
`;