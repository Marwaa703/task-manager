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

export default function handler(req, res) {
  let tasks = readTasks();

  if (req.method === "GET") {
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const { title, description, date, completed = false } = req.body;
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description,
      date,
      completed,
    };
    tasks.push(newTask);
    writeTasks(tasks); 
    res.status(201).json(newTask);
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, date, completed } = req.body;
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      date,
      completed,
    };
    writeTasks(tasks);
    res.status(200).json(tasks[taskIndex]);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    writeTasks(tasks); 
    res.status(200).json(deletedTask);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
