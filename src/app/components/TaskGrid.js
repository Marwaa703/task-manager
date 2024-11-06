import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";


const handleFetchError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

export default function TaskGrid({ tasks, filter, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const updatedTaskData = await handleFetchError(response);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTaskData.id ? updatedTaskData : task
        )
      );

      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, updatedTaskData])
      );
    } catch (error) {
      console.error("Failed to update task:", error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const deletedTask = await handleFetchError(response);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== deletedTask.id)
      );

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = storedTasks.filter(
        (task) => task.id !== deletedTask.id
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to delete task:", error.message);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const addedTask = await handleFetchError(response);

      setTasks((prevTasks) => [...prevTasks, addedTask]);

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem(
        "tasks",
        JSON.stringify([...storedTasks, addedTask])
      );
    } catch (error) {
      console.error("Failed to add task:", error.message);
    }
  };

  const handleSaveTask = async (task) => {
    try {
      if (editTask) {
        await handleEditTask(task);
      } else {
        await handleAddTask(task);
      }
      setEditTask(null);
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [setTasks]);

  return (
    <div className="flex flex-col p-6 flex-1">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks Manager</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {
            setEditTask(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      <Divider />

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-[300px] text-center border-2 border-dashed border-gray-400 rounded-md p-4">
          <p className="text-xl font-semibold text-gray-600 mb-4">
            No tasks yet. Add one!
          </p>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setEditTask(null);
              setIsModalOpen(true);
            }}
          >
            Add Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {
                setEditTask(task);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>
      )}

      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editTask={editTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
