import { Filter, ArrowUpCircle, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUserTasksBySpaceIdQuery } from "@/queries/users/tasks/useUserTasksBySpaceIdQuery";

import { TaskDropdown } from "../../components/TaskDropDown";
import { getStatusConfig } from "../../constants/StatusConfig";
import { UpdateTaskModal } from "../../components/UpdateTaskModal";
import { TaskType } from "@/types";

export function Tasks() {
  const { spaceid } = useParams();

  const { data: tasks } = useUserTasksBySpaceIdQuery(spaceid!);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [taskSelectedForUpdate, setTaskSelectedForUpdate] =
    useState<null | TaskType>(null);

  const statusOptions = [...new Set(tasks?.map((task) => task.status))];
  const priorityOptions = [...new Set(tasks?.map((task) => task.priority))];

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleUpdate = (task: TaskType) => {
    setShowUpdateTaskModal(true);
    setTaskSelectedForUpdate(task);
  };

  const handleDelete = (taskId: string) => {
    console.log(`Delete task ${taskId}`);
  };

  const closeHandler = () => {
    setShowUpdateTaskModal(false);
    setTaskSelectedForUpdate(null);
  };

  return (
    <>
      <UpdateTaskModal
        closeHandler={closeHandler}
        open={showUpdateTaskModal}
        task={taskSelectedForUpdate!}
      />
      <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Tasks
          </h1>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-300" />
              <span className="text-sm mr-2 text-gray-600 dark:text-gray-300">
                Filters:
              </span>
            </div>

            <select
              className="h-8 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white text-gray-800 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {getStatusConfig(status).label}
                </option>
              ))}
            </select>

            <select
              className="h-8 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white text-gray-800 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredTasks?.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-12 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 mb-4">
              <CheckCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              No tasks match your filters
            </h3>
            {(statusFilter !== "all" || priorityFilter !== "all") && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Try changing your filter settings
              </p>
            )}
          </div>
        )}

        {/* Tasks grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks?.map((task) => (
            <div
              key={task._id}
              className="rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-end p-1">
                <TaskDropdown
                  onUpdate={() => handleUpdate(task)}
                  onDelete={() => handleDelete(task._id)}
                />
              </div>
              <div className="p-4 pt-0 pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium dark:text-white">
                      {task.name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0 text-sm">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {task.tags &&
                    task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {task.assignee && task.assignee.length > 0 && (
                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2 mr-2">
                      {task.assignee.map((assignee) => (
                        <div
                          key={assignee.id}
                          className="h-6 w-6 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-white"
                        >
                          {assignee.name.slice(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <ArrowUpCircle
                      className={`h-4 w-4 mr-1 ${
                        task.priority === "high"
                          ? "text-red-500 dark:text-red-400"
                          : task.priority === "medium"
                          ? "text-yellow-500 dark:text-yellow-400"
                          : "text-green-500 dark:text-green-400"
                      }`}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {task.priority}
                    </span>
                  </div>
                  <div
                    className={`${
                      getStatusConfig(task.status).classes
                    } flex items-center rounded-full border px-2 py-1 text-xs font-medium transition-colors duration-200`}
                  >
                    {getStatusConfig(task.status).icon}
                    {getStatusConfig(task.status).label}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
