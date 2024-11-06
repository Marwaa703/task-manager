import React, { useEffect, useState } from "react";
import { Modal, Input, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";

export default function TaskModal({
  isModalOpen,
  setIsModalOpen,
  editTask,
  onSave,
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
  });

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    } else {
      setTask({ title: "", description: "", date: "", completed: false });
    }
  }, [editTask]);

  const handleSave = async () => {
    if (!task.title || !task.description || !task.date) {
      alert("Please fill in all required fields.");
      return;
    }
    await onSave(task);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={editTask ? "Edit Task" : "Add New Task"}
      open={isModalOpen}
      onOk={handleSave}
      onCancel={() => setIsModalOpen(false)}
    >
      <Input
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <Input
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <DatePicker
        value={task.date ? dayjs(task.date) : null}
        onChange={(date, dateString) => setTask({ ...task, date: dateString })}
      />
      <Checkbox
        checked={task.completed}
        onChange={(e) => setTask({ ...task, completed: e.target.checked })}
      >
        Completed
      </Checkbox>
    </Modal>
  );
}
