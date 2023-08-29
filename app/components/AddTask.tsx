"use client";
import React, { FormEventHandler } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

import { createTodo } from "@/api";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from "uuid";

import { AiOutlinePlus } from "react-icons/ai";

const AddTask = () => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = React.useState<string>("");

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createTodo({
      id: uuidv4(),
      name: newTaskValue,
      task_status: "Pending"
    });
    setNewTaskValue("");
    router.refresh();
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            Add task <AiOutlinePlus size={18} className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription>
              Add new task and click on save to add it to the list.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNewTask}>
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
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  className="col-span-3"
                />
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
    </div>
  );
};

export default AddTask;
