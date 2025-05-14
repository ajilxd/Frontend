import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);

  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSpaces = () => setIsSpacesOpen(!isSpacesOpen);

  const toggleProject = (projectId: string) => {
    setOpenProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const isDarkPreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(isDarkPreferred);

    if (isDarkPreferred) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          isSpacesOpen={isSpacesOpen}
          toggleSpaces={toggleSpaces}
          openProjects={openProjects}
          toggleProject={toggleProject}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-900 p-4 flex items-center justify-between shadow-sm z-10">
          <Navbar
            toggleSidebar={toggleSidebar}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
