import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "tasks.json");

const readTasks = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const getTaskById = (id, tasks) => {
  return tasks.find((task) => task.id === parseInt(id));
};

const updateTaskInArray = (id, updatedTask, tasks) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    return tasks[taskIndex];
  }
  return null;
};

const deleteTaskFromArray = (id, tasks) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1) {
    return tasks.splice(taskIndex, 1);
  }
  return null;
};

export default function handler(req, res) {
  let tasks = readTasks();
  const { id } = req.query;

  if (req.method === "GET") {
    const task = getTaskById(id, tasks);
    if (task) {
      return res.status(200).json(task);
    }
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.method === "PUT") {
    const { title, description, date, completed } = req.body;
    const updatedTask = updateTaskInArray(
      id,
      { title, description, date, completed },
      tasks
    );
    if (updatedTask) {
      writeTasks(tasks);
      return res.status(200).json(updatedTask);
    }
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.method === "DELETE") {
    const deletedTask = deleteTaskFromArray(id, tasks);
    if (deletedTask) {
      writeTasks(tasks);
      return res.status(200).json(deletedTask);
    }
    return res.status(404).json({ message: "Task not found" });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
