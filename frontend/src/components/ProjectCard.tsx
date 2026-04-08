import { Link } from "react-router-dom";
import type { Project } from "../types";

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {project.description || "No description available."}
          </p>
        </div>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {project.status}
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>
          Created: {new Date(project.created_at).toLocaleDateString()}
        </p>
        <p>Owner ID: {project.owner_id}</p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-2 items-center">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="flex-1 rounded bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(project.id)}
          className="flex-1 rounded bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Delete
        </button>

        <Link
          to={`/projects/${project.id}`}
          className="flex-1 text-center rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;