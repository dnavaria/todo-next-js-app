import {ITask} from "./types/tasks";
const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, {cache: "no-cache"});
    const todos = await res.json();
    return todos;
}

export const createTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodo = await res.json();
    return newTodo;
}

export const updateTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const updatedTodo = await res.json();
    return updatedTodo;
}

export const deleteTodo = async (task: ITask): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${task.id}`, {
        method: "DELETE",
    });
}