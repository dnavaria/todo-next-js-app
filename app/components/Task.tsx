"use client";
import React from 'react'
import { ITask } from '@/types/tasks'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import { MdOutlineDone } from 'react-icons/md'
import { MdOutlineRemoveDone } from 'react-icons/md'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

import { updateTodo } from '@/api';
import { deleteTodo } from '@/api';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [taskStatus, setTaskStatus] = React.useState<string>(task.task_status);
    const [taskName, setTaskName] = React.useState<string>(task.name);

    const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateTodo({
            id: task.id,
            name: taskName,
            task_status: taskStatus
        })
        router.refresh();
    }

    const updateTaskStatus = () => {
        if (taskStatus === "Pending") {
            updateTodo({
                id: task.id,
                name: taskName,
                task_status: "Completed"
            })
            setTaskStatus("Completed");
        } else{
            updateTodo({
                id: task.id,
                name: taskName,
                task_status: "Pending"
            })
            setTaskStatus("Pending");
        }
        router.refresh();
    }

    const handleDeleteTask = () => {
        deleteTodo({
            id: task.id,
            name: taskName,
            task_status: taskStatus
        })
        router.refresh();
    }

    return (
      <TableRow key={task.id}>
        {/* <TableCell className="font-medium">{task.id}</TableCell> */}
        {/* conditional rendering if task completed then strike through text */}
        
        {task.task_status === "Completed" ? (
            <TableCell className="line-through">{task.name}</TableCell>
        ) : (
            <TableCell>{task.name}</TableCell>
        )}
        <TableCell className="text-center">{task.task_status}</TableCell>
        <TableCell className='flex items-center justify-center gap-4' >
            <Dialog>
                <DialogTrigger>
                    <FiEdit className="cursor-pointer text-blue-500" size={18} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit task</DialogTitle>
                        <DialogDescription>
                            Edit task and click on save to update it to the list.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditTask}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="task"
                                    className="text-left ml-5 font-bold text-lg"
                                >
                                    Task
                                </Label>
                                <Input 
                                    id="task"
                                    name="task"
                                    type="text"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="col-span-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="status"
                                    className="text-left ml-5 font-bold text-lg"
                                >
                                    Status
                                </Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={taskStatus}
                                    onChange={(e) => setTaskStatus(e.target.value)}
                                    className="col-span-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">
                                    Save
                                </Button>

                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
                                    
                                    
            </Dialog>
            {/* <FiEdit className="cursor-pointer text-blue-500" size={18} /> */}
            {task.task_status === "Pending" ? ( 
                <MdOutlineDone onClick={updateTaskStatus} className="cursor-pointer text-green-500" size={18} />
            ) : (  
                <MdOutlineRemoveDone onClick={updateTaskStatus} className="cursor-pointer text-red-500" size={18} />
            )}
            {/* <MdOutlineRemoveDone className="cursor-pointer text-red-500" size={18} /> */}
            <AiFillDelete className="cursor-pointer text-red-500" size={18} onClick={handleDeleteTask} />
        </TableCell>
      </TableRow>
    );
}

export default Task