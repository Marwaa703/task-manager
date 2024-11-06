import { Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{task.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-lg font-medium ${
            task.completed
              ? "text-green-500 border-green-900"
              : "text-red-500 border-red-900"
          }`}
        >
          {task.completed ? "Completed" : "Incomplete"}
        </span>
        <div className="flex space-x-3">
          <Button
            type="link"
            icon={<EditOutlined />}
            primary
            onClick={onEdit}
            className="text-white hover:text-blue-500 transition-all duration-300"
          />
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              className="text-white hover:text-red-500 transition-all duration-300"
            />
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}
