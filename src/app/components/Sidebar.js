import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaTasks,
  FaListAlt,
  FaCheckCircle,
  FaSignOutAlt,
  FaPen,
} from "react-icons/fa";
import { Divider, Modal, Input } from "antd";
import AvatarSelection from "./AvatarSelection";

export default function Sidebar({
  onFilterChange,
  activeTab,
  setActiveTab,
  isMobile,
}) {
  const [userName, setUserName] = useState("Enter Your Name");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState("/profile.png");

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    const savedUserAvatar = localStorage.getItem("userAvatar");

    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (savedUserAvatar) {
      setUserAvatar(savedUserAvatar);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userAvatar", userAvatar);
  }, [userName, userAvatar]);

  const navItems = [
    { id: "all", label: "All Tasks", icon: <FaTasks /> },
    { id: "incomplete", label: "Uncompleted", icon: <FaListAlt /> },
    { id: "completed", label: "Completed", icon: <FaCheckCircle /> },
  ];

  const handleAvatarChange = (newAvatar) => {
    setUserAvatar(newAvatar);
    setIsAvatarModalVisible(false);
  };

  return (
    <div
      className={`bg-gray-800 text-white p-6 ${
        isMobile
          ? "w-1/2 h-full fixed top-0 left-0 z-30 flex flex-col justify-between"
          : "w-64 h-screen fixed flex flex-col justify-between"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={userAvatar}
            alt="User Profile"
            className="rounded-full cursor-pointer"
            width={700}
            height={700}
            onClick={() => setIsAvatarModalVisible(true)}
          />
          <FaPen
            className="absolute bottom-2 right-2 text-gray-200 bg-gray-700 p-1 rounded-full cursor-pointer hover:text-white"
            size={18}
            onClick={() => setIsAvatarModalVisible(true)}
          />
        </div>

        {isEditingName ? (
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            className="text-lg font-semibold text-center bg-gray-800 text-black"
            autoFocus
          />
        ) : (
          <h2
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setIsEditingName(true)}
          >
            {userName}
          </h2>
        )}
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

      <Modal
        title="Choose Your Avatar"
        open={isAvatarModalVisible}
        onCancel={() => setIsAvatarModalVisible(false)}
        footer={null}
      >
        <Divider />
        <AvatarSelection onAvatarSelect={handleAvatarChange} />
      </Modal>
    </div>
  );
}
