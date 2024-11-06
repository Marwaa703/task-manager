"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TaskGrid from "./components/TaskGrid";
import { FaBars } from "react-icons/fa";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => setSidebarVisible(!sidebarVisible);

  const handleOutsideClick = (e) => {
    if (isMobile && sidebarVisible && e.target.id === "backdrop") {
      setSidebarVisible(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {isMobile && (
        <div className="p-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-10">
          <button
            onClick={handleSidebarToggle}
            className="text-white p-2 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
      )}

      <div className="flex flex-1 mt-16 lg:mt-0">
        {isMobile && sidebarVisible && (
          <div
            id="backdrop"
            className="fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={handleOutsideClick}
          >
            <Sidebar
              onFilterChange={setFilter}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Sidebar for Desktop */}
        {!isMobile && (
          <Sidebar
            onFilterChange={setFilter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
          />
        )}

        {/* Main Content */}
        <div
          className={`flex-1 p-6 ${
            isMobile ? "mt-16" : "ml-64"
          } overflow-y-auto`}
        >
          <TaskGrid tasks={tasks} filter={filter} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}
