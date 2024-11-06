import React, { useEffect, useState } from "react";
import { Modal, Input, DatePicker, Checkbox, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    } else {
      setTask({ title: "", description: "", date: "", completed: false });
    }
  }, [editTask]);

  const handleSave = async () => {
    if (!task.title || !task.description || !task.date) {
      messageApi.open({
        type: "error",
        content: "Please fill in all required fields.",
      });
      return;
    }

    await onSave(task);
    setTask({ title: "", description: "", date: "", completed: false });
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}

      <Modal
        title={editTask ? "Edit Task" : "Add New Task"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          setTask({ title: "", description: "", date: "", completed: false });
        }}
        okText={editTask ? "Save Changes" : "Add Task"}
      >
        <div>
          <Input
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: "8px" }}>
          <Input
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: "8px" }}>
          <DatePicker
            placeholder="Task Date"
            value={task.date ? dayjs(task.date) : null}
            onChange={(date, dateString) =>
              setTask({ ...task, date: dateString })
            }
            required
          />
        </div>
        <div style={{ marginTop: "8px" }}>
          <Checkbox
            checked={task.completed}
            onChange={(e) => setTask({ ...task, completed: e.target.checked })}
          >
            Completed
          </Checkbox>
        </div>
      </Modal>
    </>
  );
}
