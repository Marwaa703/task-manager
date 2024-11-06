import Image from "next/image";
import {
  FaTasks,
  FaListAlt,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Divider } from "antd";

export default function Sidebar({
  onFilterChange,
  activeTab,
  setActiveTab,
  isMobile,
}) {
  const navItems = [
    { id: "all", label: "All Tasks", icon: <FaTasks /> },
    { id: "incomplete", label: "Uncompleted", icon: <FaListAlt /> },
    { id: "completed", label: "Completed", icon: <FaCheckCircle /> },
  ];

  return (
    <div
      className={`bg-gray-800 text-white p-6 ${
        isMobile
          ? "w-1/2 h-full fixed top-0 left-0 z-30 flex flex-col justify-between"
          : "w-64 h-screen fixed flex flex-col justify-between"
      }`}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/profile.png"
          alt="User Profile"
          className="w-16 h-16 rounded-full mb-4"
          width={500}
          height={500}
        />
        <h2 className="text-lg font-semibold">User Name</h2>
      </div>
      <Divider />
      <nav className="flex flex-col space-y-4 mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onFilterChange(item.id);
              setActiveTab(item.id);
            }}
            className={`flex items-center space-x-3 p-2 text-sm ${
              activeTab === item.id
                ? "bg-gray-700 rounded-lg"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.icon} <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 mt-auto">
        <FaSignOutAlt /> <span>Sign Out</span>
      </button>
    </div>
  );
}
