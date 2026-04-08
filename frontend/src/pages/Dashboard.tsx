import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projects";
import type { Project } from "../types";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getProjects(page, 10, search);
      setProjects(data.results);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  const handleCreate = async (data: any) => {
    await createProject(data);
    setShowForm(false);
    fetchProjects();
  };

  const handleUpdate = async (data: any) => {
    if (!editingProject) return;
    await updateProject(editingProject.id, data);
    setEditingProject(null);
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search projects..."
            className="border px-3 py-2 rounded-lg w-full md:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-sm text-gray-500">
            Total projects: {total}
          </span>
        </div>

        <button
            onClick={() => {
              setShowForm(true);
              setEditingProject(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + New Project
          </button>
        </div>

        {/* Form */}
        {(showForm || editingProject) && (
          <div className="mb-6">
            <ProjectForm
              initialData={editingProject || undefined}
              onSubmit={editingProject ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
            />
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(p) => {
                setEditingProject(p);
                setShowForm(false);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span className="px-3 py-1">{page}</span>

          <button
            disabled={projects.length < 10}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;