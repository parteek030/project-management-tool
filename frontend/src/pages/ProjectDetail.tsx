import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
import type { Task, TaskStatus } from "../types";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByProject(
        projectId,
        filter === "all" ? undefined : filter
      );
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleCreate = async (data: any) => {
    await createTask(data);
    setShowForm(false);
    fetchTasks();
  };

  const handleUpdate = async (data: any) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, data);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        {/* Top */}
        <div className="flex justify-between mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TaskStatus | "all")}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            onClick={() => {
              setShowForm(true);
              setEditingTask(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </div>

        {/* Form */}
        {(showForm || editingTask) && (
          <div className="mb-6">
            <TaskForm
              projectId={projectId}
              initialData={editingTask || undefined}
              onSubmit={editingTask ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        {/* Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t) => {
                setEditingTask(t);
                setShowForm(false);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;