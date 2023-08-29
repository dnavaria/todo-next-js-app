"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ITask } from "@/types/tasks";
import Task from "./Task";
import { useEffect } from "react";
  
// const Tasks = [
// {
//     id: "Task001",
//     task_status: "Completed",
//     name: "Complete TODO App",
// },
// {
//     id: "Task002",
//     task_status: "Pending",
//     name: "Complete Algorithm Development",
// },
// {
//     id: "Task003",
//     task_status: "Pending",
//     name: "Solve DSA Problems",
// },
// {
//     id: "Task004",
//     task_status: "Completed",
//     name: "Test TODO App",
// },

// ]

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks })  => {
    const sortedTasks = tasks.sort((a, b) => b.task_status.localeCompare(a.task_status));
    return (
      <Table>
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Task ID</TableHead> */}
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    )
  }
  
export default TodoList;